import { useState } from 'react';
import GenderSelectorButtons from '@/components/GenderSelector/GenderSelectorButtons';
import GenderDisplay from '@/components/GenderSelector/GenderDisplay';
import CreateLabel from '@/components/CreateLabel/CreateLabel';

function GenderSelector() {
  const [selectedGender, setSelectedGender] = useState('anyone');
  const [showButtons, setShowButtons] = useState(false);

  const handleGenderSelect = (genderId) => {
    setSelectedGender(genderId);
    setShowButtons(false);
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div>
      <CreateLabel label="성별">
        <div onClick={toggleButtons} style={{ cursor: 'pointer' }}>
          <GenderDisplay selectedGender={selectedGender} />
        </div>
      </CreateLabel>
      {showButtons && (
        <GenderSelectorButtons
          onGenderSelect={handleGenderSelect}
          selectedGender={selectedGender}
        />
      )}
    </div>
  );
}

export default GenderSelector;
