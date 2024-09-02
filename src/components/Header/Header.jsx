import { useState } from 'react';
import S from './Header.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { string, bool, array } from 'prop-types';

function HeaderTest({
  title,
  contactName,
  back = false,
  myLocation = false,
  search = false,
  actions = [],
}) {
  const [location, setLocation] = useState('i_location_line');

  const handleClick = () => {
    setLocation((prevClass) =>
      prevClass === 'i_location_line' ? 'i_location_filled' : 'i_location_line'
    );
  };

  return (
    <header className={S.header}>
      {/* 채팅 or 프로필 수정 */}
      {title && <h1 className="hdg-lg">{title}</h1>}

      {/* 뒤로가기 아이콘 */}
      {back && <IconButton className="i_direction_left" />}

      {/* 위치 변경 버튼 */}
      {myLocation && (
        <button className={S.location_btn} onClick={handleClick}>
          <span className={location}></span>
          <span className="hdg-lg">신도림동</span>
        </button>
      )}

      {/* 채팅방 : 대화상대 */}
      {contactName && <p className="lbl-md">{contactName}</p>}

      {/* 검색 필드 */}
      {search && (
        <input
          type="text"
          className={`${S.inputField} para-md`}
          placeholder="검색어를 입력해주세요"
        />
      )}

      {/* 우측 아이콘 버튼이 1개일 경우 */}
      {actions.length === 1 && <IconButton className={actions[0]} />}

      {/* 우측 아이콘 버튼이 2개 이상일 경우 */}
      {actions.length > 1 && (
        <ul role="group">
          {actions.map((action, index) => (
            <li key={index}>
              <IconButton className={action} />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

HeaderTest.propTypes = {
  title: string, // title=""
  contactName: string, // contactName=""
  back: bool, // back={boolean}
  myLocation: bool, // myLocation={boolean}
  search: bool, // search={boolean}
  actions: array, // actions={['i_example']}
};

export default HeaderTest;
