import S from './Badge.module.css';
import { string } from 'prop-types';

// function Badge({ text, variant }) {
//   const badgeClass = `${S.Badge} ${S[variant]}`;
//   return <span className={badgeClass}>{text}</span>;
// }

function Badge({ text, variant }) {
  const badgeStyle = {
    '--badge-background-color':
      variant === 'recruit'
        ? '#148ce1'
        : variant === 'end_recruit'
        ? '#7f7f7f'
        : variant === 'category'
        ? '#5aaef1'
        : variant === 'end_category'
        ? '#b2b2b2'
        : 'blue',
  };

  return (
    <span className={S.Badge} style={badgeStyle}>
      {text}
    </span>
  );
}

Badge.propTypes = {
  text: string,
};

export default Badge;
