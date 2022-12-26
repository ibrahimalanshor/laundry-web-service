const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

exports.getStartOfTheDay = function () {
  return dayjs().startOf('day').local().format();
};

exports.getEndOfTheDay = function () {
  return dayjs().endOf('day').local().format();
};

exports.addDay = function (count) {
  return dayjs().add(count, 'day').local().format();
};

exports.addHour = function (count) {
  return dayjs().add(count, 'hour').local().format();
};
