import { useState } from 'react';
import S from './Header.module.css';
import { string, bool, array } from 'prop-types';
import IconButton from '@/components/IconButton/IconButton';
import OptionPopup from '../OptionPopup/OptionPopup';

// 사용 방법
// <Header back={true}></Header>
// <Header back={true} actions={['i_search']}></Header>
// <Header back={true} actions={['i_like_line', 'i_export', 'i_option']} />
// <Header myLocation={true} actions={['i_search']}></Header>
// <Header back={true} search={true} actions={['i_search']}></Header>
// <Header title="프로필 수정" actions={['i_close']}></Header>
// <Header title="채팅" actions={['i_search']}></Header>
// <Header back={true} contactName="김멋사" actions={['i_menu']}></Header>

Header.propTypes = {
  title: string, // title=""
  contactName: string, // contactName=""
  back: bool, // back={boolean}
  myLocation: bool, // myLocation={boolean}
  search: bool, // search={boolean}
  actions: array, // actions={['i_example']}
};

const iconButtonActions = [
  { className: 'i_search', title: '검색하기' },
  { className: 'i_like_line', title: '저장하기' },
  { className: 'i_export', title: '공유하기' },
  { className: 'i_close', title: '닫기' },
  { className: 'i_menu', title: '메뉴 열기' },
];

function Header({
  title,
  contactName,
  back = false,
  myLocation = false,
  search = false,
  actions = [],
}) {
  const menuOptions = [
    { label: '모집완료', onClick: () => console.log('모집완료 클릭!') },
    { label: '수정하기', onClick: () => console.log('수정하기 클릭!') },
    { label: '삭제하기', onClick: () => console.log('삭제하기 클릭!') },
  ];

  const [location, setLocation] = useState('i_location_line');
  const [isOptionPopupActive, setIsOptionPopupActive] = useState(false);

  const handleLocationClick = () => {
    setLocation((prevClass) =>
      prevClass === 'i_location_line' ? 'i_location_filled' : 'i_location_line'
    );
  };

  // OptionPopup 토글
  const isToggleOption = () => {
    setIsOptionPopupActive((prevState) => !prevState);
  };

  const getTitle = (className) => {
    const action = iconButtonActions.find(
      (item) => item.className === className
    );
    return action ? action.title : '';
  };

  return (
    <header className={S.header}>
      {/* 채팅 or 프로필 수정 */}
      {title && <h1 className="hdg-lg">{title}</h1>}

      {/* 뒤로가기 아이콘 */}
      {back && (
        <IconButton
          title="뒤로 가기"
          className="i_direction_left"
          onClick={() => console.log('뒤로 가기 클릭')}
        />
      )}

      {/* 위치 변경 버튼 */}
      {myLocation && (
        <button
          title="내 위치"
          aria-label="내 위치"
          aria-pressed={location === 'i_location_filled'}
          className={S.location_btn}
          onClick={handleLocationClick}
        >
          <span className={location}></span>
          <span className="hdg-lg">신도림동</span>
        </button>
      )}

      {/* 채팅방 : 대화상대 */}
      {contactName && <p className="lbl-md">{contactName}</p>}

      {/* 검색 필드 */}
      {search && (
        <input
          type="search"
          className={`${S.inputField} para-md`}
          placeholder="검색어를 입력해주세요"
          aria-label="검색어를 입력해주세요"
        />
      )}

      {/* 우측 아이콘 버튼이 1개일 경우 */}
      {actions.length === 1 && (
        <IconButton
          className={actions[0]}
          onClick={actions[0] === 'i_option' ? isToggleOption : undefined}
          title={getTitle(actions[0])}
        />
      )}

      {/* 우측 아이콘 버튼이 2개 이상일 경우 */}
      {actions.length > 1 && (
        <ul role="group" aria-label="옵션 버튼 그룹">
          {actions.map((action, index) => (
            <li key={index}>
              <IconButton
                title={getTitle(action)}
                className={action}
                onClick={action === 'i_option' ? isToggleOption : undefined}
              />
              {isOptionPopupActive && action === 'i_option' && (
                <OptionPopup options={menuOptions} />
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
