import S from './PendingCard.module.css';
import { node, string } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';

PendingCard.propTypes = {
  children: node,
  description: node || string,
};

export function PendingCard({ children, description }) {
  return (
    <div className={S.wrapper}>
      <ProfileImg></ProfileImg>
      <div className={S.component}>
        <ProfileTitle name="고명한" className={'para-md'}>
          {children}
        </ProfileTitle>
        {description}
      </div>
    </div>
  );
}
