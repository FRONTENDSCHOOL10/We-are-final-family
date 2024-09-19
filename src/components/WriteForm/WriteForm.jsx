import ButtonSelector from './ButtonSelector/ButtonSelector';
import { AgeData } from './ButtonSelector/data/AgeDate';
import { GenderData } from './ButtonSelector/data/GenderData';
import {
  ProfileAgeData,
  ProfileGenderData,
} from './ButtonSelector/data/ProfileData';
import { Toggle } from './ButtonSelector/Toggle/Toggle';
import DateSelector from './DateSelector/DateSelector';
import LocationButton from './LocationButton/LocationButton';
import PersonnelCounter from './PersonnelCounter/PersonnelCounter';
import TimeSelector from './TimeSelector/TimeSelector';
import PropTypes from 'prop-types';

function WriteForm({
  label,
  title,
  toggle,
  toggleName,
  type = 'default',
  value,
  btnValue,
  onChange,
  onToggleChange,
  isToggleOn,
}) {
  switch (label) {
    case '인원':
      return <PersonnelCounter label={label} />;
    case '날짜':
      return <DateSelector label={label} />;
    case '장소':
      return <LocationButton label={label} />;
    case '시간':
      return <TimeSelector label={label} />;
    case '토글':
      return (
        <Toggle
          toggleName={toggleName}
          onChange={onToggleChange}
          isOn={isToggleOn}
        />
      );
    case '성별':
      return (
        <ButtonSelector
          data={type === 'profile' ? ProfileGenderData : GenderData}
          label={label}
          title={title}
          toggle={toggle}
          toggleName={toggleName}
          value={value}
          btnValue={btnValue}
          onChange={onChange}
          onToggleChange={onToggleChange}
          isToggleOn={isToggleOn}
        />
      );
    case '연령':
      return (
        <ButtonSelector
          data={type === 'profile' ? ProfileAgeData : AgeData}
          label={label}
          title={title}
          toggle={toggle}
          toggleName={toggleName}
          value={value}
          btnValue={btnValue}
          onChange={onChange}
          onToggleChange={onToggleChange}
          isToggleOn={isToggleOn}
        />
      );
    default:
      return null;
  }
}

WriteForm.propTypes = {
  label: PropTypes.oneOf([
    '인원',
    '날짜',
    '장소',
    '시간',
    '토글',
    '성별',
    '연령',
  ]).isRequired,
  title: PropTypes.string,
  toggle: PropTypes.oneOf(['on', 'off']),
  toggleName: PropTypes.string,
  type: PropTypes.oneOf(['default', 'profile']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  btnValue: PropTypes.string,
  onChange: PropTypes.func,
  onToggleChange: PropTypes.func,
  isToggleOn: PropTypes.bool,
};

WriteForm.defaultProps = {
  type: 'default',
  toggle: 'off',
  value: '',
  btnValue: '',
  onChange: () => {},
  onToggleChange: () => {},
  isToggleOn: false,
};

export default WriteForm;
