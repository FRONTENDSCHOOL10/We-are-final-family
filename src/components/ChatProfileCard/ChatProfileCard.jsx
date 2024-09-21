import S from './ChatProfileCard.module.css';
import { node, string } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';
import { func } from 'prop-types';

ChatProfileCard.propTypes = {
  children: node,
  description: string,
  onClick: func,
  name: string,
};

export function ChatProfileCard({
  children = '00:00',
  description = '최신 채팅 내역',
  name,
  ...props
}) {
  return (
    <div className={S.wrapper} {...props}>
      <ProfileImg></ProfileImg>
      <div className={S.component}>
        <ProfileTitle name={name}>{children}</ProfileTitle>
        <p className="para-sm">{description}</p>
      </div>
    </div>
  );
}
