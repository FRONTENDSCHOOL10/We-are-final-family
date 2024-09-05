import { useState, useEffect } from 'react';
import S from './LocationButton.module.css';
import CurrentLocationButton from './CurrentLocationButton/CurrentLocationButton';

function LocationButton({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleLocationUpdate(location) {
    setSelectedLocation(location);
    closeModal();
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={S.container}>
      <span className={`${S.label} para-md`}>{label}</span>
      <div className={S.inputWrapper} onClick={openModal}>
        <span
          className={`para-md ${
            selectedLocation ? S.locationTextSelected : S.locationText
          }`}
        >
          {selectedLocation || '입력해주세요'}
        </span>
      </div>
      {isModalOpen && (
        <div className={S.modalOverlay} onClick={handleOverlayClick}>
          <div className={S.modalContent}>
            <CurrentLocationButton onLocationUpdate={handleLocationUpdate} />
            <button className={S.closeButton} onClick={closeModal}>
              <span className="i_close" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationButton;
