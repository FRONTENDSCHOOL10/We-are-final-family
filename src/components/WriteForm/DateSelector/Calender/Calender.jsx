import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './Calender.module.css';
import IconButton from '@/components/IconButton/IconButton';

function Calendar({ selectedDate, onChange, onClose, isOpen }) {
  // selectedDate를 Date 객체로 확실히 변환
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate || new Date())
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // selectedDate를 Date 객체로 변환
  const selectedDateObj = new Date(selectedDate || new Date());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function firstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function renderDays() {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={S.emptyDay}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      const isPastDate = date < today;
      days.push(
        <button
          key={i}
          type="button"
          className={`${S.day} ${
            date.toDateString() === selectedDateObj.toDateString()
              ? S.selected
              : ''
          } ${isPastDate ? S.pastDate : ''}`}
          onClick={() => {
            if (!isPastDate) {
              onChange(
                new Date(date.getFullYear(), date.getMonth(), date.getDate())
              );
              onClose();
            }
          }}
        >
          {i}
        </button>
      );
    }

    return days;
  }

  function changeMonth(increment) {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
  }

  function handleWrapperClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`${S.calendarWrapper} ${isOpen ? S.calendarWrapperOpen : ''}`}
      onClick={handleWrapperClick}
    >
      <div className={`${S.calendar} ${isOpen ? S.calendarOpen : ''}`}>
        <div className={S.closeBtn}>
          {/* <IconButton
            title="캘린더 닫기"
            className="i_close"
            onClick={onClose}
          /> */}
        </div>
        <div className={S.header}>
          <IconButton
            title="이전 달"
            className="i_direction_left"
            onClick={() => changeMonth(-1)}
          />
          <span className="lbl-lg">
            {currentMonth.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <IconButton
            title="다음 달"
            className="i_direction_right"
            onClick={() => changeMonth(1)}
          />
        </div>
        <div className={`${S.weekdays} lbl-md`}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span key={day} className={S.weekday}>
              {day}
            </span>
          ))}
        </div>
        <div className={`${S.days} para-md`}>{renderDays()}</div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Calendar;
