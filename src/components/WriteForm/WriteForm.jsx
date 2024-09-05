import ButtonSelector from './ButtonSelector/ButtonSelector';
import { AgeData } from './ButtonSelector/data/AgeDate';
import { GenderData } from './ButtonSelector/data/GenderData';
import DateSelector from './DateSelector/DateSelector';
import LocationButton from './LocationButton/LocationButton';
import PersonnelCounter from './PersonnelCounter/PersonnelCounter';
import TimeSelector from './TimeSelector/TimeSelector';

function WriteForm({ label }) {
  switch (label) {
    case '인원':
      return <PersonnelCounter label={label} />;
    case '날짜':
      return <DateSelector label={label} />;
    case '장소':
      return <LocationButton label={label} />;
    case '시간':
      return <TimeSelector label={label} />;
    case '성별':
      return <ButtonSelector data={GenderData} label={label} />;
    case '나이':
      return <ButtonSelector data={AgeData} label={label} />;
    default:
      return null;
  }
}

export default WriteForm;
