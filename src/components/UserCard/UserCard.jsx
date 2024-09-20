import S from './UserCard.module.css';
import { node, string, number, func } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';

function UserCard({
  description,
  userId,
  states,
  onClick,
  image,
  username,
  postCount,
  writer,
  currentuser,
  ...props
}) {
  switch (states) {
    case 'pending':
      return (
        <div className={S.wrapper} {...props}>
          <ProfileImg></ProfileImg>
          <div className={S.component}>
            <ProfileTitle name={username} className={'lbl-md'}>
              {currentuser === writer ? (
                <div className={S.actions}>
                  <button className={`${S.agree} lbl-sm`}>승인</button>
                  <button className={`${S.disagree} lbl-sm`}>거절</button>
                </div>
              ) : (
                ''
              )}
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
            <ProfileTitle name={username} className={'lbl-md'}>
              {writer === userId ? (
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
        <div className={S.profile} {...props}>
          <ProfileImg
            width={'4.84375rem'}
            height={'4.84375rem'}
            display="block"
            onClick={onClick}
            image={image}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rrem',
            }}
          >
            <ProfileTitle name={username} className="lbl-lg" />
            <p className="para-sm" style={{ color: 'var(--gray-600)' }}>
              작성글 {postCount}
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

UserCard.propTypes = {
  description: node || string,
  userId: string,
  states: string.isRequired,
  onClick: func,
  image: string,
  username: string,
  postCount: number,
};

export default UserCard;
