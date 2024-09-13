import { useState, useRef, useEffect } from 'react';
import S from './TimeSelector.module.css';

function TimeSelector({ label }) {
  // 시간, 분, AM/PM, 모달 열림 상태를 관리하는 state
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [isAM, setIsAM] = useState(true);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // 전체 컴포넌트와 시간 선택기 래퍼에 대한 ref
  const timeSelectorRef = useRef(null);
  const timePickerWrapperRef = useRef(null);

  // 모달 외부 클릭 시 모달을 닫는 효과
  useEffect(() => {
    function handleClickOutside(event) {
      // 모달이 열려있고, 클릭된 요소가 시간 선택기 래퍼 외부일 경우
      if (
        isTimePickerOpen &&
        timePickerWrapperRef.current &&
        !timePickerWrapperRef.current.contains(event.target)
      ) {
        setIsTimePickerOpen(false); // 모달 닫기
      }
    }

    // 이벤트 리스너 추가 및 제거
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTimePickerOpen]);

  // 시간 변경 핸들러
  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  // 분 변경 핸들러
  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
  };

  // 시간 선택기 열기/닫기 토글
  const toggleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  // AM/PM 토글
  const toggleAMPM = () => {
    setIsAM((prevIsAM) => !prevIsAM);
  };

  // 선택된 시간을 형식에 맞춰 반환
  const formatTime = () => {
    const formattedHour = selectedHour.padStart(2, '0');
    const formattedMinute = selectedMinute.padStart(2, '0');
    return `${isAM ? '오전' : '오후'} ${formattedHour}:${formattedMinute}`;
  };

  // 시간 옵션 생성 (1-12)
  const generateHourOptions = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
  };

  // 분 옵션 생성 (00-55, 5분 간격)
  const generateMinuteOptions = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i.toString().padStart(2, '0'));
    }
    return minutes;
  };

  return (
    <div className={S.container} ref={timeSelectorRef}>
      <span className={`${S.label} para-md`}>{label}</span>
      <div className={S.timeSelector}>
        {/* 선택된 시간을 표시하고, 클릭 시 모달 열기 */}
        <span
          className={`${S.selectedTime} para-md`}
          onClick={toggleTimePicker}
        >
          {formatTime()}
        </span>
      </div>
      {isTimePickerOpen && (
        // 모달 오버레이. 클릭 시 모달 닫기
        <div className={S.modalOverlay} onClick={toggleTimePicker}>
          {/* 시간 선택기 래퍼. 이벤트 전파 중단으로 내부 클릭 시 모달 유지 */}
          <div
            className={S.timePickerWrapper}
            onClick={(e) => e.stopPropagation()}
            ref={timePickerWrapperRef}
          >
            {/* AM/PM 토글 버튼 */}
            <button onClick={toggleAMPM} className={`${S.ampmToggle} para-md`}>
              {isAM ? '오전' : '오후'}
            </button>
            {/* 시간 선택 드롭다운 */}
            <select
              value={selectedHour}
              onChange={handleHourChange}
              className={`${S.timeSelect} para-md`}
            >
              {generateHourOptions().map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            {/* 분 선택 드롭다운 */}
            <select
              value={selectedMinute}
              onChange={handleMinuteChange}
              className={`${S.timeSelect} para-md`}
            >
              {generateMinuteOptions().map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSelector;
