import Model from "./model";
import DTO from './dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";
import { v4 } from "uuid";

class Vacations implements Model {

    public async getAll(): Promise<DTO[]> {
        const vacations = (await query(`
            SELECT  vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    image
            FROM    vacations
            ORDER BY startDate ASC
        `,));
        return vacations;
    }

    public async getAllPages(pageNumber: number, recordsPerPage: number): Promise<DTO[]> {
        const offset = (pageNumber - 1) * recordsPerPage;
        const vacations = await query(`
            SELECT  vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    image
            FROM    vacations
            ORDER BY vacationId
            LIMIT   ?
            OFFSET  ?
        `, [recordsPerPage, offset]);

        return vacations;
    }

    public async getOne(id: string): Promise<DTO> {
        const vacation = (await query(`
            SELECT  vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    image
            FROM    vacations 
            WHERE   vacationId = ?
        `, [id]))[0];
        return vacation;
    }

    public async add(vacation: DTO): Promise<DTO> {
        const { destination, description, startDate, endDate, price, image } = vacation;
        const vacationId = v4(); // Generate UUID for vacationId

        const addVacation: OkPacketParams = await query(`
            INSERT INTO vacations(vacationId, destination, description, startDate, endDate, price, image)
            VALUES(?, ?, ?, ?, ?, ?, ?)
        `, [vacationId, destination, description, startDate, endDate, price, image]);
        return this.getOne(vacationId);
    }

    public async remove(id: string): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM vacations
            WHERE       vacationId = ?
        `, [id]);
        return Boolean(result.affectedRows);
    }

    public async update(vacation: DTO): Promise<DTO> {
        const { vacationId, destination, description, startDate, endDate, price, image } = vacation;
        await query(`
                UPDATE vacations
                SET    destination = ?,
                       description = ?,
                       startDate = ?,
                       endDate = ?,
                       price = ?,
                       image = ?
                WHERE  vacationId = ?
            `, [destination, description, startDate, endDate, price, image, vacationId]);
        return this.getOne(vacationId);
    }

    public async getAllByStartDate(date: string): Promise<DTO[]> {
        const vacations = await query(`
            SELECT  vacationId,
                    destination,
                    description,
                    startDate,
                    endDate,
                    price,
                    image
            FROM    vacations  
            WHERE   startDate >= ?
        `, [date]);
        return vacations;
    }

    public async getAllByBetweenDates(): Promise<DTO[]> {
        const vacations = await query(`
            SELECT vacationId,
                   destination,
                   description,
                   startDate,
                   endDate,
                   price,
                   image
            FROM vacations  
            WHERE CURRENT_DATE BETWEEN startDate AND endDate;
        `)
        return vacations;
    }
}

const vacations = new Vacations();
export default vacations;