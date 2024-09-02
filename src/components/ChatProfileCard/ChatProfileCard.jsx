import S from './ChatProfileCard.module.css';
import { node } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';

ProfileCard.propTypes = {
  children: node,
};

export function ProfileCard({ children }) {
  return (
    <div className={S.wrapper}>
      <ProfileImg></ProfileImg>
      <div className={S.component}>
        <ProfileTitle>{children}</ProfileTitle>
        <p>최신 채팅 내역</p>
      </div>
    </div>
  );
}
