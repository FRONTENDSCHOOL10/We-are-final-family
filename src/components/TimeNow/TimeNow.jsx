import S from './TimeNow.module.css';

export function TimeNow() {
  const today = new Date();
  const hours = today.getHours();
  let minutes = today.getMinutes();
  let AMPM = '오전';
  if (hours >= 12) {
    AMPM = '오후';
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return (
    <span className={`${S.component} para-sm`}>
      {AMPM}
      {hours}:{minutes}
    </span>
  );
}
