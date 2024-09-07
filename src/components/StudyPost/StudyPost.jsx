import Badge from '../Badge/Badge';
import S from './StudyPost.module.css';
import { string, bool } from 'prop-types';

StudyPost.propTypes = {
  time: string,
  who: string,
  agree: bool,
  text: string,
};

function StudyPost({ time, who, agree, text }) {
  return (
    <div style={{ padding: '1rem' }}>
      <div className={S.headerComponent}>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <Badge text="모집중" variant="recruit" />
          <Badge text="스터디" variant="category" />
        </div>
        <h2>피그마 딜러 모집합니다</h2>
      </div>
      <div className={S.iconPosition}>
        <span
          className="i_calendar_filled"
          style={{ color: 'var(--gray-300)' }}
        ></span>
        <span className="para-md" style={{ color: 'var(--gray-600)' }}>
          08.29오후7시{time}
        </span>
      </div>
      <div className={S.iconPosition}>
        <span
          className="i_people_filled"
          style={{ color: 'var(--gray-300)' }}
        ></span>
        <span className="para-md" style={{ color: 'var(--gray-600)' }}>
          누구나 참여 가능{who}
        </span>
      </div>
      <div className={S.iconPosition}>
        <span
          className="i_lock_filled"
          style={{ color: 'var(--gray-300)' }}
        ></span>
        <span className="para-md" style={{ color: 'var(--gray-600)' }}>
          승인 후 참여{agree}
        </span>
      </div>

      <p className="para-md" style={{ padding: '1rem 0' }}>
        연남동 거주하시는 분 중에서 이번에 시작하는 멋사플레이스 피그마 스터디
        하실 분 구합니다. 하다가 어려우면 선범님 강의 결제 예정입니다. *연남동
        스타벅스에서 매주 월요일 진행!{text}
      </p>
    </div>
  );
}

export default StudyPost;
