import { useState, useRef, useEffect } from 'react';
import S from './TimeSelector.module.css';
import PropTypes from 'prop-types';

function TimeSelector({ label, value, onChange }) {
  const [selectedHour, setSelectedHour] = useState(
    value ? value.split(':')[0] : '07'
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? value.split(':')[1] : '00'
  );
  const [isAM, setIsAM] = useState(
    value ? parseInt(value.split(':')[0]) < 12 : true
  );
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const timeSelectorRef = useRef(null);
  const timePickerWrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isTimePickerOpen &&
        timePickerWrapperRef.current &&
        !timePickerWrapperRef.current.contains(event.target)
      ) {
        setIsTimePickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTimePickerOpen]);

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
    updateTime(e.target.value, selectedMinute);
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
    updateTime(selectedHour, e.target.value);
  };

  const toggleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const toggleAMPM = () => {
    setIsAM((prevIsAM) => {
      const newIsAM = !prevIsAM;
      updateTime(selectedHour, selectedMinute, newIsAM);
      return newIsAM;
    });
  };

  const updateTime = (hour, minute, am = isAM) => {
    let formattedHour = parseInt(hour);
    if (!am && formattedHour !== 12) formattedHour += 12;
    if (am && formattedHour === 12) formattedHour = 0;
    const formattedTime = `${formattedHour
      .toString()
      .padStart(2, '0')}:${minute}`;
    onChange(formattedTime);
  };

  const formatTime = () => {
    const formattedHour = selectedHour.padStart(2, '0');
    const formattedMinute = selectedMinute.padStart(2, '0');
    return `${isAM ? '오전' : '오후'} ${formattedHour}:${formattedMinute}`;
  };

  const generateHourOptions = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
  };

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
        <span
          className={`${S.selectedTime} para-md`}
          onClick={toggleTimePicker}
        >
          {formatTime()}
        </span>
      </div>
      {isTimePickerOpen && (
        <div className={S.modalOverlay} onClick={toggleTimePicker}>
          <div
            className={S.timePickerWrapper}
            onClick={(e) => e.stopPropagation()}
            ref={timePickerWrapperRef}
          >
            <button onClick={toggleAMPM} className={`${S.ampmToggle} para-md`}>
              {isAM ? '오전' : '오후'}
            </button>
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

TimeSelector.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TimeSelector;
