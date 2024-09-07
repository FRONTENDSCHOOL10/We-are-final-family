import { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import S from './InterestSelector.module.css';
import { useSupabase } from '@/api/DataService';

function InterestSelector({ onSelectInterest }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { interest } = useSupabase();

  const handleOpenSelector = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInterestClick = (interest) => {
    onSelectInterest(interest);
    handleClose();
  };

  return (
    <div>
      <Button color="white" onClick={handleOpenSelector}>
        <span className="i_target"></span>관심분야 선택하기
      </Button>
      {isOpen && (
        <div className={`${S.backdrop} ${S.open}`}>
          <div
            className={`${S.container} ${isOpen ? S.show : ''}`}
            ref={modalRef}
          >
            <div className={S.header}>
              <h2 className="para-md">카테고리 선택</h2>
              <button onClick={handleClose} className={S.closeButton}>
                <span className="i_close"></span>
              </button>
            </div>
            <div className={S.interestList}>
              {interest.map((interest) => (
                <button
                  key={interest}
                  className={`${S.interestButton} para-md`}
                  onClick={() => handleInterestClick(interest)}
                >
                  {interest.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterestSelector;
