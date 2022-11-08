import loadData from '../script/loadData.js';

const initialLoad = async () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('-------------------------------');
        console.log('Importing data from the Space Flight API.');
        await loadData();
        console.log('Finished importing.');
        console.log('-------------------------------');
    }
};

export { initialLoad };