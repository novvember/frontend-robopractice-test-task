export default function formatTime(timeInMins) {
  if (!timeInMins) return '0';
  const hours = Math.floor(timeInMins / 60);
  const mins = timeInMins % 60;
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
}
