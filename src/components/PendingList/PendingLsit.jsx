import { UserCard } from '../UserCard/UserCard';
import S from './PendingList.module.css';
import { number } from 'prop-types';

PendingList.propTypes = {
  join: number,
};

export function PendingList({ join = 1 }) {
  return (
    <div className={`${S.component}`}>
      <h3 className="lbl-md">
        대기 중인 파티원 <span>{join}</span>
      </h3>
      <UserCard states={'pending'} />
    </div>
  );
}
