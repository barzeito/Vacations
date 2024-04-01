import Model from "./model";
import DTO from './dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";

class Users implements Model {

    public async getAll(): Promise<DTO[]> {
        const users = (await query(`
            SELECT  userId,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
        `,));
        return users;
    }

    public async getOne(id: string): Promise<DTO> {
        const user = (await query(`
           SELECT  userId,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
            WHERE   userId = ?
        `, [id]))[0];
        return user;
    }
}

const users = new Users();
export default users;