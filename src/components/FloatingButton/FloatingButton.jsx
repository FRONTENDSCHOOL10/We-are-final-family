import S from './FloatingButton.module.css';
import { func } from 'prop-types';

function FloatingButton({ handleFloatBtnClick }) {
  return (
    <button
      aria-label="게시글 작성하기"
      className={S.floating_btn}
      onClick={handleFloatBtnClick}
    >
      <span aria-hidden="true" className="i_plus"></span>
    </button>
  );
}

FloatingButton.propTypes = {
  handleFloatBtnClick: func,
};

export default FloatingButton;
