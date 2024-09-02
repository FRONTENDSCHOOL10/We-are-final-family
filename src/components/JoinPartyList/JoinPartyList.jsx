import { number } from 'prop-types';
import S from './JoinPartyList.module.css';
import { JoinPartCard } from '../JoinPartyCard/JoinPartyCard';

JoinPartyList.propTypes = {
  join: number,
  maxparty: number,
};

export function JoinPartyList({ join = 1, maxparty = 4 }) {
  return (
    <div className={`${S.component} lbl-md `}>
      <h3>
        참여 중인 파티원{' '}
        <span style={{ color: 'var(--primary)' }}> {join}/</span>
        {maxparty}
      </h3>
      <JoinPartCard description="연남동">
        <div className={S.wrapper}>
          <span className="i_certificate" />
          파티장
        </div>
      </JoinPartCard>
    </div>
  );
}
