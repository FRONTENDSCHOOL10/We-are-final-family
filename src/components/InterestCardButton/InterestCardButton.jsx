import { bool } from 'prop-types';
import S from './InterestCardButton.module.css';

InterestCardButton.propTypes = {
  active: bool,
};

export function InterestCardButton({ active }) {
  if (active) {
    return (
      <div className={S.checked}>
        <div className={S.checkedIcon}></div>
      </div>
    );
  } else {
    return (
      <div className={S.unChecked}>
        <div className={S.unCheckedIcon}></div>
      </div>
    );
  }
}
