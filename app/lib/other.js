export const dateTimeFormat = (date) => {
  const originalDate = new Date(date);
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах

  return new Date(originalDate.getTime() - timeZoneOffset).toLocaleString('ru-RU', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}