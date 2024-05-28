import { addSeconds } from 'date-fns/addSeconds';
import { format as dateFnsFormat } from 'date-fns/format';

const formatSeconds = (seconds) => {
  const date = addSeconds(new Date(0), seconds);
  return dateFnsFormat(date, 'mm:ss');
};

export default formatSeconds;
