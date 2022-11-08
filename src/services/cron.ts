import cron from 'node-cron';

import loadData from '../script/loadData.js';

const cronScheduler = () => {
    if (process.env.NODE_ENV !== 'test') {
        cron.schedule('4 16 * * *', async () => {
            console.log('------------------');
            console.log('Running CRON job');
            await loadData();
            console.log('Finished.');
            console.log('------------------');
        });
    }
};

export { cronScheduler };