import { useState } from 'react';
import S from './LocationInput.module.css';
import CurrentLocationButton from './CurrentLocationButton/CurrentLocationButton';

const LocationInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationSet, setIsLocationSet] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setIsLocationSet(e.target.value !== '');
  };

  const handleLocationUpdate = (newLocation) => {
    setLocation(newLocation);
    setIsLoading(false);
    setIsLocationSet(true);
    closeModal();
  };

  return (
    <div className={S.con}>
      <div
        className={`${S.inputWrapper} ${isLocationSet ? S.locationSet : ''}`}
        onClick={openModal}
      >
        {location || '입력해주세요'}
      </div>

      {isModalOpen && (
        <div className={S.modal}>
          <div className={S.modalContent}>
            <CurrentLocationButton
              onLocationUpdate={handleLocationUpdate}
              setIsLoading={setIsLoading}
            />
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="장소를 입력하세요"
              className={S.input}
              disabled={isLoading}
            />

            <button onClick={closeModal} className={S.closeBtn}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
