import S from './HomeDetail.module.css';
import { useState, useEffect } from 'react';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import { JoinPartyList } from '@/components/JoinPartyList/JoinPartyList';
import { PendingList } from '@/components/PendingList/PendingList';
import { useLocation } from 'react-router-dom';
import useListStore from '@/stores/useListStore';
import { usePartyStore } from '@/stores/usePartyStore';
import { formatDateWithTime } from '@/utils/formatDate';
import { supabase } from '@/api/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { Fallback } from '..';

function HomeDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isOptionPopupActive, setIsOptionPopupActive] = useState(false);
  const { setSingleData } = useListStore();
  const { updatePendingArray } = usePartyStore();

  const handleLikeButton = () => {
    console.log('저장 버튼 클릭');
    setIsLiked((prevState) => !prevState);
  };
  const handleExportButton = () => {
    console.log('내보내기 버튼 클릭');
  };

  const menuOptions = [
    { label: '모집완료', onClick: () => console.log('모집완료 클릭!') },
    { label: '수정하기', onClick: () => console.log('수정하기 클릭!') },
    { label: '삭제하기', onClick: () => console.log('삭제하기 클릭!') },
  ];

  const handleOptionButton = () => {
    console.log('옵션 버튼 클릭');
    setIsOptionPopupActive((prevState) => !prevState);
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const encodedId = query.get('q');
  const id = atob(encodedId); // base64 디코딩된 id 값

  const { singleData, error, isLoading, fetchData } = useListStore(); // Zustand 사용

  useEffect(() => {
    fetchData('party', id); // 'party' 테이블에서 특정 id의 데이터 조회
  }, [id, fetchData]);

  useEffect(() => {
    return () => {
      setSingleData(null);
    };
  }, [setSingleData, updatePendingArray]);

  if (isLoading) return <Fallback />;
  if (error) return <p>에러: {error}</p>;
  if (!singleData) return <p>데이터가 없습니다.</p>;

  const formattedDate = formatDateWithTime(singleData.meet_date);

  const applyForParty = async () => {
    if (!singleData || isApplying) return;

    setIsApplying(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('로그인이 필요합니다.');

      const { data: partyDetail, error: fetchError } = await supabase
        .from('party_detail')
        .select('*')
        .eq('id', singleData.id)
        .single();

      if (fetchError) throw fetchError;

      // 중복 체크
      for (let i = 1; i <= 6; i++) {
        if (
          partyDetail[`join_${i}`] === user.id ||
          partyDetail[`pending_${i}`] === user.id
        ) {
          throw new Error('이미 이 파티에 참여 중이거나 대기 중입니다.');
        }
      }

      let updateField = null;
      for (let i = 1; i <= 6; i++) {
        if (partyDetail[`pending_${i}`] === null) {
          updateField = `pending_${i}`;
          break;
        }
      }

      if (!updateField) {
        throw new Error('더 이상 대기자를 받을 수 없습니다.');
      }

      const { error: updateError } = await supabase
        .from('party_detail')
        .update({ [updateField]: user.id })
        .eq('id', singleData.id);

      if (updateError) throw updateError;

      toast.success('파티 신청이 완료되었습니다.');
      // 상태 업데이트 로직 (예: fetchData 재호출 또는 상태 업데이트)
      await fetchData('party', singleData.id);
    } catch (error) {
      console.error('파티 신청 중 오류 발생:', error);
      toast.error(error.message || '파티 신청에 실패했습니다.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Header
        back={true}
        actions={[
          {
            icon: isLiked ? 'i_like_filled' : 'i_like_line',
            onClick: handleLikeButton,
          },
          { icon: 'i_export', onClick: handleExportButton },
          { icon: 'i_option', onClick: handleOptionButton },
        ]}
      />
      {isOptionPopupActive && <OptionPopup options={menuOptions} />}
      <main className={S.homeDetail}>
        <div className={S.detailWrap}>
          <section className={S.post}>
            <header className={S.postHeader}>
              <ul className={S.postBadge}>
                <li>
                  <Badge
                    text={singleData.state ? '모집중' : '모집마감'}
                    variant={singleData.state ? 'recruit' : 'end_recruit'}
                  />
                </li>
                <li>
                  <Badge
                    text={singleData.category}
                    variant={singleData.state ? 'category' : 'end_category'}
                  />
                </li>
              </ul>
              <h1 className="hdg-lg">{singleData.title}</h1>
            </header>
            <div className={S.postContent}>
              <ul className="para-md">
                <li aria-label="날짜">
                  <span aria-hidden="true" className="i_calendar_filled"></span>
                  <span>{formattedDate}</span>
                </li>
                <li aria-label="장소">
                  <span aria-hidden="true" className="i_location_filled"></span>
                  <span>{singleData.location_2}</span>
                </li>
                <li aria-label="성별">
                  <span aria-hidden="true" className="i_people_filled"></span>
                  <span>{singleData.gender} 참여 가능</span>
                </li>
                <li aria-label="연령">
                  <span aria-hidden="true" className="i_people_filled"></span>
                  <span>{singleData.age} 참여 가능</span>
                </li>
              </ul>
              <p className="para-md">{singleData.description}</p>
              {singleData.party_img && (
                <div className={S.partyImageContainer}>
                  <img
                    src={singleData.party_img}
                    alt="파티 이미지"
                    className={S.partyImage}
                  />
                </div>
              )}
            </div>
          </section>
          <section className={S.state}>
            <JoinPartyList />
            <PendingList />
          </section>
        </div>
        <footer>
          <Button color="black" onClick={applyForParty} disabled={isApplying}>
            {isApplying ? '신청 중...' : '파티 신청'}
          </Button>
        </footer>
      </main>
    </>
  );
}

export default HomeDetail;
