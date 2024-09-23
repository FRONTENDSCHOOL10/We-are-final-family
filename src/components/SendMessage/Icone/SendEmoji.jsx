import S from './SendEmoji.module.css';
import PropTypes from 'prop-types';

export function SendEmoji({ onClick }) {
  return (
    <button
      type="button"
      className={`${S.emoji}`}
      onClick={onClick}
      aria-label="이모지"
    >
      <span className="i_emoji"></span>
    </button>
  );
}

SendEmoji.propTypes = {
  onClick: PropTypes.func,
};
