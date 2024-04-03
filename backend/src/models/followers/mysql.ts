import Model from "./model";
import DTO from './dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";

class Followers implements Model {

    public async getAll(): Promise<DTO[]> {
        const followers = (await query(`
            SELECT  userId,
                    vacationId
            FROM    followers  
        `,));
        return followers;
    }

    public async getOne(id: string): Promise<DTO> {
        const follower = (await query(`
            SELECT  userId,
                    vacationId
            FROM    followers 
            WHERE   userId = ?
        `, [id]))[0];
        return follower;
    }

    public async follow(follower: DTO): Promise<DTO> {
        const { userId, vacationId } = follower;
        await query(`
            INSERT INTO followers (userId, vacationId)
            VALUES (?, ?)
        `, [userId, vacationId]);
        return this.getOne(userId);
    }

    public async unFollow(id: string): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM followers
            WHERE       vacationId = ?
        `, [id]);
        return Boolean(result.affectedRows);
    }
}

const followers = new Followers();
export default followers;