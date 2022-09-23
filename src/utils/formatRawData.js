import getNumberOfDays from './getNumberOfDays';

export default function formatRawData(rawData) {
  const year = rawData[0].Days[0].Date.split('-')[0];
  const month = rawData[0].Days[0].Date.split('-')[1];
  const dataSource = [];

  rawData.forEach((obj, pos) => {
    const userData = {
      key: obj.id,
      user: obj.Fullname,
    };
    Object.assign(userData, formatDays(obj.Days));
    dataSource.push(userData);
  });

  return [dataSource, { year, month }];
}

function formatDays(rawDays) {
  const month = rawDays[0].Date.split('-')[2];
  const numberOfDays = getNumberOfDays(month);
  const days = {};
  let total = 0;

  for (let rawDay of rawDays) {
    const day = Number(rawDay.Date.split('-')[2]);
    const start = rawDay.Start.split('-').map(Number);
    const end = rawDay.End.split('-').map(Number);
    const mins = 60 * end[0] + end[1] - (60 * start[0] + start[1]) + 1;
    total += mins;
    days[`day${+day}`] = mins;
  }

  for (let i = 1; i <= numberOfDays; i++) {
    const key = `day${i}`;
    if (days[key]) continue;
    days[key] = 0;
  }

  days.total = total;

  return days;
}
