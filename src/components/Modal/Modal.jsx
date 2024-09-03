import S from './Modal.module.css';
import { useEffect } from 'react';
import { object, func } from 'prop-types';
import { Button } from '@/components/Button/Button';

function Modal({ modalData, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const { contents, buttons } = modalData;

  return (
    <div className={S.modal_wrap}>
      <div
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        aria-modal="true"
        className={S.modal}
      >
        {contents.title && (
          <h2 id="modalTitle" className={`${S.title} hdg-lg`}>
            {contents.title}
          </h2>
        )}
        <div role="group" id="modalDescription" className={S.content_wrap}>
          {contents.text && (
            <p className={`${S.content} para-md`}>{contents.text}</p>
          )}
          {contents.subtext && (
            <p className={`${S.content_sub} para-sm`}>{contents.subtext}</p>
          )}
        </div>
        <div role="group" className={S.actions}>
          {buttons.map((button, index) => (
            <Button key={index} color={button.color} onClick={button.onClick}>
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <div className={S.modal_overlay} onClick={handleOverlayClick}></div>
    </div>
  );
}

Modal.propTypes = {
  modalData: object,
  onClose: func,
};

export default Modal;
