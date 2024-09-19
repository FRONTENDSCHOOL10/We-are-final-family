import { number } from 'prop-types';
import S from './JoinPartyList.module.css';
import UserCard from '../UserCard/UserCard';

JoinPartyList.propTypes = {
  join: number,
  maxparty: number,
};

export function JoinPartyList({ join = 1, maxparty = 4 }) {
  return (
    <div className={`${S.component}`}>
      <h3 className="lbl-md">
        참여 중인 파티원 <span>{join}/</span>
        {maxparty}
      </h3>
      <UserCard states={'join'} />
    </div>
  );
}
