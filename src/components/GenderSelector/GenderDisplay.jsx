import { GenderSelectorData } from './data/GenderSelectorData';

/* eslint-disable react/prop-types */
function GenderDisplay({ selectedGender }) {
  return (
    <>
      {GenderSelectorData.find((option) => option.id === selectedGender)?.label}
    </>
  );
}

export default GenderDisplay;
