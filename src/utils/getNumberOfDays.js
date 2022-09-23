export default function getNumberOfDays(month) {
  const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return DAYS[+month - 1];
}
