import Model from "./model";
import DTO, { Roles } from './user-dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";
import CredentialsDTO from "./credential-dto";
import { hashPassword } from "../../utils/crypto";
import { v4 } from "uuid";

class Auth implements Model {

    public async getOne(id: string): Promise<DTO> {
        const user = (await query(`
           SELECT   userId,
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

    public async login(credentials: CredentialsDTO): Promise<DTO> {
        const { email, password } = credentials;
        const user = (await query(`
           SELECT   userId,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
            WHERE   email = ?
            AND     password = ?
        `, [email, hashPassword(password, config.get<string>('app.secret'))]))[0];
        return user;
    }

    public async signUp(user: DTO): Promise<DTO> {
        const { firstName, lastName, email, password } = user;
        const userId = v4();

        const result: OkPacketParams = await query(`
            INSERT INTO users(userId, firstName, lastName, email, password, roleId)
            VALUES(?, ?, ?, ?, ?, ?)
        `, [userId, firstName, lastName, email, hashPassword(password, config.get<string>('app.secret')), Roles.USER]);
        return this.getOne(userId);
    }

    public async getByEmail(email: string): Promise<DTO | null> {
        const user = (await query(`
           SELECT   userId,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
            WHERE   email = ?
        `, [email]))[0];
        return user || null;
    }

    public async isAdmin(email: string): Promise<boolean> {
        const user = (await query(`
            SELECT   roleId
            FROM     users  
            WHERE    email = ?
        `, [email]))[0];

        return user?.roleId === 2;
    }
}

const auth = new Auth();
export default auth;