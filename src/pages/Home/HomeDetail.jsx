import S from './HomeDetail.module.css';
import { useState } from 'react';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import { JoinPartyList } from '@/components/JoinPartyList/JoinPartyList';
import { PendingList } from '@/components/PendingList/PendingList';

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

  const menuOptions = [
    { label: '모집완료', onClick: () => console.log('모집완료 클릭!') },
    { label: '수정하기', onClick: () => console.log('수정하기 클릭!') },
    { label: '삭제하기', onClick: () => console.log('삭제하기 클릭!') },
  ];

  const handleOptionButton = () => {
    console.log('옵션 버튼 클릭');
    setIsOptionPopupActive((prevState) => !prevState);
  };

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
            <Badge text="모집중" variant="recruit"></Badge>
            <Badge text="스터디" variant="category"></Badge>
            피그마 스터디 하실 분~
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
