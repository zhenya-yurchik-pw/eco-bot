const CronJob = require('cron').CronJob;
const jobFirst = (cb) => new CronJob('0 11 * * *', () => cb(), null, true, 'Europe/Minsk');
const jobSecond = (cb) => new CronJob('30 11 * * *', () => cb(), null, true, 'Europe/Minsk');
const jobThird = (cb) => new CronJob('0 12 * * *', () => cb(), null, true, 'Europe/Minsk');

module.exports = {
  startAllJobs: (cb) => {
    jobFirst(cb).start();
    jobSecond(cb).start();
    jobThird(cb).start();
  },
};
