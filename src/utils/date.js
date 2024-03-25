import addSeconds from 'date-fns/addSeconds';
import dateFnsFormat from 'date-fns/format';

export const formatDateForBackend = (dateString) =>
  dateFnsFormat(new Date(dateString), 'yyyy-MM-dd');

export const formatSeconds = (seconds) => {
  const date = addSeconds(new Date(0), seconds);
  return dateFnsFormat(date, 'mm:ss');
};

export const formatTransactionsDate = (date) => {
  const dateObj = new Date(`${date.split('.')[0]}Z`);

  const dayMonth = dateFnsFormat(dateObj, 'dd MMM');
  const year = dateFnsFormat(dateObj, 'yy');
  const time = dateFnsFormat(dateObj, 'HH:mm');

  return `${dayMonth} '${year}, ${time}`;
};
