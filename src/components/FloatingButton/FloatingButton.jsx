import S from './FloatingButton.module.css';
import { func } from 'prop-types';

FloatingButton.propTypes = {
  onClick: func.isRequired,
};

function FloatingButton({ onClick }) {
  return (
    <button
      aria-label="게시글 작성하기"
      className={S.floating_btn}
      onClick={onClick}
    >
      <span aria-hidden="true" className="i_plus"></span>
    </button>
  );
}

export default FloatingButton;
