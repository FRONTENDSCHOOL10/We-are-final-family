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

// 사용방법
// <WriteForm label="장소" />
// <WriteForm label="인원" />
// <WriteForm label="날짜" />
// <WriteForm label="시간" />
// <WriteForm label="성별" title="on" toggleName="전체 공개" toggle="on" />
// <WriteForm label="연령" title="on" toggleName="전체 공개" toggle="on" />
// <WriteForm label="토글" toggleName="승인 후 참여" toggle="on" />
// <WriteForm label="연령" title="on" toggleName="전체 공개" toggle="on" type="profile" />
// <WriteForm label="성별" title="on" toggleName="전체 공개" toggle="on" type="profile" />

function WriteForm({
  label,
  title,
  toggle,
  toggleName,
  type = 'default',
  value,
  onChange,
}) {
  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

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
      return <Toggle toggleName={toggleName} />;
    case '성별':
      return (
        <ButtonSelector
          data={type === 'profile' ? ProfileGenderData : GenderData}
          label={label}
          title={title}
          toggle={toggle}
          toggleName={toggleName}
          value={value}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      );
    default:
      return null;
  }
}

export default WriteForm;
