// make duration more readable
export const formatDuration = (duration) => {
  let date = new Date(0);
  date.setSeconds(duration);
  return date.toISOString().substring(11, 19);
}