import S from './Badge.module.css';
import { string } from 'prop-types';

// 사용 방법
// <Badge text="모집중" variant="recruit" />
// <Badge text="모집종료" variant="end_recruit" />
// <Badge text="프로젝트" variant="category" />
// <Badge text="프로젝트" variant="end_category" />

Badge.propTypes = {
  text: string,
  variant: string,
};

function Badge({ text, variant }) {
  const badgeBackgroundColor =
    variant === 'recruit'
      ? '--primary'
      : variant === 'end_recruit'
      ? '--gray-500'
      : variant === 'category'
      ? '--secondary'
      : variant === 'end_category'
      ? '--gray-300'
      : '--secondary';

  const badgeStyle = {
    '--badge-background-color': `var(${badgeBackgroundColor})`,
  };

  return (
    <span className={S.Badge} style={badgeStyle} aria-label={text}>
      {text}
    </span>
  );
}

export default Badge;
