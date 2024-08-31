import { useState } from 'react';
import S from './Calender.module.css';

// eslint-disable-next-line react/prop-types
const Calendar = ({ selectedDate, onChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = () => {
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
        <div
          key={i}
          className={`${S.day} ${
            // eslint-disable-next-line
            date.toDateString() === selectedDate.toDateString()
              ? S.selected
              : ''
          } ${isPastDate ? S.pastDate : ''}`}
          onClick={() => {
            if (!isPastDate || date.toDateString() === today.toDateString()) {
              onChange(date);
              onClose();
            }
          }}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1
      )
    );
  };

  return (
    <div className={S.calendar}>
      <div className={S.header}>
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className={S.weekdays}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className={S.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={S.days}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
