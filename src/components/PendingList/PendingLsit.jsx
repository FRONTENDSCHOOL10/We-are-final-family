import S from './PendingList.module.css';
import { PendingCard } from '../PendingCard/PendingCard';
import { AgreeButton } from '../AgreeButton/AgreeButton';
import { number } from 'prop-types';

PendingList.propTypes = {
  join: number,
};

export function PendingList({ join }) {
  return (
    <div className={`${S.component} lbl-md`}>
      <h4>
        대기 중인 파티원 <span style={{ color: 'var(--primary)' }}>{join}</span>
      </h4>

      <PendingCard description={<AgreeButton />} />
      <PendingCard description={<AgreeButton />} />
      <PendingCard description={<AgreeButton />} />
    </div>
  );
}
