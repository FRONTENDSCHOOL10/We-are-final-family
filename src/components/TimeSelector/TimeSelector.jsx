import { useState, useRef, useEffect } from 'react';
import S from './TimeSelector.module.css';

function TimeSelector() {
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [isAM, setIsAM] = useState(true);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const timeSelectorRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        timeSelectorRef.current &&
        !timeSelectorRef.current.contains(event.target)
      ) {
        setIsTimePickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [timeSelectorRef]);

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
  };

  const toggleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const toggleAMPM = () => {
    setIsAM((prevIsAM) => !prevIsAM);
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
    <div className={S.con} ref={timeSelectorRef}>
      <div className={S.timeSelector}>
        {isTimePickerOpen && (
          <div className={(S.timePickerWrapper, S.sel)}>
            <button onClick={toggleAMPM} className={S.ampmToggle}>
              {isAM ? '오전' : '오후'}
            </button>
            <select
              value={selectedHour}
              onChange={handleHourChange}
              className={S.timeSelect}
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
              className={S.timeSelect}
            >
              {generateMinuteOptions().map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        )}
        <span className={S.selectedTime} onClick={toggleTimePicker}>
          {formatTime()}
        </span>
      </div>
    </div>
  );
}

export default TimeSelector;
