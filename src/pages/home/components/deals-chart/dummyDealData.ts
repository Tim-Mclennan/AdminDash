import { MappedDealData } from './utils';
import { randAmount, randMonth, randNumber, randBoolean } from '@ngneat/falso';

const generateDealData = (count: number): MappedDealData[] => {
 const dealData: MappedDealData[] = [];
 for (let i = 0; i < count; i++) {
    const timeUnix = new Date(2023, randNumber({ min: 1, max: 12}), 1).getTime(); // Generates a timestamp for the first day of a random month and year
    const timeText = `${randMonth()} 2024`; // Formats the date to MM YYYY
    const value = randAmount({ min: 1000, max: 1000000 }); // Generates a random value between $1000 and $1000000
    const state = randBoolean() ? 'Won' : 'Lost'; // Randomly selects between 'Won' and 'Lost'

    dealData.push({ timeUnix, timeText, value, state });
 }
 return dealData;
};

export const dummyDealData = generateDealData(10); // Generates 10 dummy deal data records