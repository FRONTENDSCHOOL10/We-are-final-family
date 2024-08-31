import { useState, useEffect, useRef } from 'react';
import S from './DateSelector.module.css';
import CalendarIcon from '@/assets/button/icon/calendar.svg';
import Calendar from './Calender/Calender';

function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef]);

  const formatDate = (date) => {
    if (!date) return '';

    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    if (selectedDay.getTime() === today.getTime()) {
      return '오늘';
    } else if (selectedDay.getTime() === tomorrow.getTime()) {
      return '내일';
    } else {
      const diffTime = selectedDay - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][
        selectedDay.getDay()
      ];
      return `D${diffDays > 0 ? '+' : '-'}${Math.abs(
        diffDays
      )} ${dayOfWeek}요일`;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className={S.con}>
      <span className={S.label}>날짜</span>
      <div className={S.dateSelector} ref={datePickerRef}>
        <img
          src={CalendarIcon}
          alt="Calendar"
          className={S.icon}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        />
        <span>{formatDate(selectedDate)}</span>
        {isCalendarOpen && (
          <div className={S.calendarWrapper}>
            <Calendar
              selectedDate={selectedDate}
              onChange={handleDateChange}
              onClose={() => setIsCalendarOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
