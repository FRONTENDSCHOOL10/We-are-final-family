import S from './OptionPopup.module.css';
import { array } from 'prop-types';

function OptionPopup({ options = [] }) {
  return (
    <div className={S.popup_option}>
      <ul role="menu">
        {options.map((option, index) => (
          <li
            key={index}
            role="menuitem"
            tabIndex="-1"
            onClick={option.onClick}
            className="para-sm"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

OptionPopup.propTypes = {
  options: array, // options={[]}
};

export default OptionPopup;
