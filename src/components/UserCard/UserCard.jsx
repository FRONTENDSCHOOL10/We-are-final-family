import S from './UserCard.module.css';
import { node, string } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';
import { useState } from 'react';
import { func } from 'prop-types';

UserCard.propTypes = {
  children: node,
  description: node || string,
  userId: string,
  states: string,
  name: string,
  onClick: func,
};

export function UserCard({
  description = '연남동',
  userId,
  states,
  name,
  onClick,
  ...props
}) {
  const [state] = useState(states);

  switch (state) {
    case 'pending':
      return (
        <div className={S.wrapper}>
          <ProfileImg></ProfileImg>
          <div className={S.component}>
            <ProfileTitle name={name} className={'lbl-md'}>
              <div className={S.actions}>
                <button className={`${S.agree} lbl-sm`}>승인</button>
                <button className={`${S.disagree} lbl-sm`}>거절</button>
              </div>
            </ProfileTitle>
          </div>
        </div>
      );
    case 'join':
      return (
        <div className={S.wrapper} onClick={onClick} {...props}>
          <ProfileImg></ProfileImg>
          <span className=""></span>
          <div className={S.component}>
            <ProfileTitle name={name} className={'lbl-md'}>
              {userId === userId ? (
                <div className={`${S.cert} para-sm`}>
                  <span className="i_certificate" />
                  파티장
                </div>
              ) : (
                ''
              )}
            </ProfileTitle>
            <p className={`${S.desc} para-sm`}>{description}</p>
          </div>
          <div>
            <button>프로필보기</button>
            <button>채팅하기</button>
          </div>
        </div>
      );
    case 'profile':
      return (
        <div className={S.profile}>
          <ProfileImg
            width={'4.84375rem'}
            height={'4.84375rem'}
            display="block"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rrem',
            }}
          >
            <ProfileTitle name={name} className="lbl-lg"></ProfileTitle>
            <p className="para-sm" style={{ color: 'var(--gray-600)' }}>
              작성글10
            </p>
          </div>
        </div>
      );
  }
}
