import S from './Modal.module.css';
import { Button } from '@/components/Button/Button';
import { string, array, func } from 'prop-types';

/* 사용 방법 */
// import 문
// import {
//   handleModalConfirm,
//   handleModalCancel,
//   handleModalClose,
// } from '@/components/Modal/data';

// return 문
{
  /* <Modal
  title="모달 제목 입력"
  desc="설명 텍스트 입력"
  subDesc="부가 설명 텍스트 입력"
  buttons={[
    { color: 'white', label: '취소', action: 'cancel' },
    { color: 'black', label: '확인', action: 'confirm' },
  ]}
  onConfirm={handleModalConfirm}
  onCancel={handleModalCancel}
  onClose={handleModalClose}
></Modal>; */
}
// 핸들러 -> data.js

function Modal({
  title,
  desc,
  subDesc,
  buttons,
  onConfirm,
  onCancel,
  onClose,
}) {
  // 오버레이 클릭 시
  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleButtonClick = (action) => {
    // 확인 버튼 클릭 시 onConfirm 호출
    if (action === 'confirm') {
      if (onConfirm) onConfirm();
    }
    // 취소 버튼 클릭 시 onCancel 호출
    else if (action === 'cancel') {
      if (onCancel) onCancel();
    }
    // 오버레이 클릭 시 onClose 호출
    else {
      if (onClose) onClose();
    }
  };

  return (
    <div className={S.modal_wrap}>
      <div
        role="dialog"
        aria-labelledby={title ? 'modalTitle' : undefined}
        aria-describedby={desc ? 'modalDescription' : undefined}
        aria-modal="true"
        className={S.modal}
      >
        {/* 제목 */}
        {title && (
          <h2 id="modalTitle" className={`${S.title} hdg-lg`}>
            {title}
          </h2>
        )}

        {/* 설명, 부가 설명 */}
        {(desc || subDesc) && (
          <div role="group" id="modalDescription" className={S.content_wrap}>
            {desc && <p className={`${S.content} para-md`}>{desc}</p>}
            {subDesc && <p className={`${S.content_sub} para-sm`}>{subDesc}</p>}
          </div>
        )}

        {/* 버튼 */}
        {buttons && buttons.length > 0 && (
          <div role="group" className={S.actions}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                color={button.color}
                onClick={() => handleButtonClick(button.action)}
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className={S.modal_overlay} onClick={handleOverlayClick}></div>
    </div>
  );
}

Modal.propTypes = {
  title: string,
  desc: string,
  subDesc: string,
  buttons: array,
  onConfirm: func,
  onCancel: func,
  onClose: func,
};

export default Modal;
