import path from 'path'
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../../../config/');
import query from '../../db/mysql'
import { v4 } from 'uuid';
import vacations from './mysql';

jest.mock('../../db/mysql', () => ({
    ...jest.requireActual('../../db/mysql'),
    __esModule: true,
    default: jest.fn()
}))

describe('Vacations mysql test implementation', () => {
    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('Check if getOne call return the right value', () => {
        test('Should return information about vacation with a specific id', async () => {
            const vacationId = v4();
            const destination = "Israel";
            const description = "Jews Place";
            const startDate = new Date();
            const endDate = new Date();
            const price = 100;
            const image = v4();

            const vacationId2 = v4();
            const destination2 = "Israel2";
            const description2 = "Jews Place2";
            const startDate2 = new Date();
            const endDate2 = new Date();
            const price2 = 1002;
            const image2 = v4();

            query.mockResolvedValue([{
                vacationId,
                destination,
                description,
                startDate,
                endDate,
                price,
                image
            }, {
                vacationId2,
                destination2,
                description2,
                startDate2,
                endDate2,
                price2,
                image2
            }])
            const result = await vacations.getOne(vacationId);
            expect(result).toMatchObject({
                vacationId,
                destination,
                description,
                startDate,
                endDate,
                price,
                image
            })

        })
    })
    describe('Check if getAll call return all values', () => {
        test('Should return a list of all vacations', async () => {
            const vacationId = v4();
            const destination = "Israel";
            const description = "Jews Place";
            const startDate = new Date();
            const endDate = new Date();
            const price = 100;
            const image = v4();

            const vacationId2 = v4();
            const destination2 = "Israel2";
            const description2 = "Jews Place2";
            const startDate2 = new Date();
            const endDate2 = new Date();
            const price2 = 1002;
            const image2 = v4();

            const vacationsList = [{
                vacationId: vacationId,
                destination: destination,
                description: description,
                startDate: startDate,
                endDate: endDate,
                price: price,
                image: image
            }, {
                vacationId: vacationId2,
                destination: destination2,
                description: description2,
                startDate: startDate2,
                endDate: endDate2,
                price: price2,
                image: image2
            }];

            (query as jest.Mock).mockResolvedValue(vacationsList);

            const result = await vacations.getAll();
            expect(result).toEqual(vacationsList);
        });
    })
})