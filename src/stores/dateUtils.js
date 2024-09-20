export function combineDateTime(date, time) {
  const [hours, minutes] = time.split(' ')[1].split(':');
  const newDate = new Date(date);
  newDate.setHours(parseInt(hours, 10) + (time.includes('오후') ? 12 : 0));
  newDate.setMinutes(parseInt(minutes, 10));
  return newDate.toISOString();
}

export function extractTimeFromDate(dateTime) {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  return `${ampm} ${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
