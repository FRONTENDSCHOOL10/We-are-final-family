import S from './HomeDetail.module.css';
import { useState } from 'react';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import { JoinPartyList } from '@/components/JoinPartyList/JoinPartyList';
import { PendingList } from '@/components/PendingList/PendingList';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useListStore from '@/stores/useListStore';
import { formatDateWithTime } from '@/utils/formatDate';
import { usePartyStore } from '@/stores/usePartyStore';

function HomeDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeButton = () => {
    console.log('저장 버튼 클릭');
    setIsLiked((prevState) => !prevState);
  };
  const handleExportButton = () => {
    console.log('내보내기 버튼 클릭');
  };

  const [isOptionPopupActive, setIsOptionPopupActive] = useState(false);
  const { setSingleData } = useListStore();
  const { updatePendingArray } = usePartyStore();

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

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;
  if (!singleData) return <p>데이터가 없습니다.</p>;

  const formattedDate = formatDateWithTime(singleData.meet_date);

  return (
    <>
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
                  <span>{singleData.place}</span>
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
            </div>
          </section>
          <section className={S.state}>
            <JoinPartyList />
            <PendingList />
          </section>
        </div>
        <footer>
          <Button color="black">채팅방으로 이동</Button>
        </footer>
      </main>
    </>
  );
}

export default HomeDetail;
