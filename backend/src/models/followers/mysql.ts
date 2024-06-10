import Model from "./model";
import DTO from './dto';
import { OkPacketParams, RowDataPacket } from "mysql2";
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

    public async unFollow(follower: DTO): Promise<boolean> {
        const { userId, vacationId } = follower;
        const result: OkPacketParams = await query(`
            DELETE FROM followers
            WHERE       userId = ? AND  vacationId = ?
        `, [userId, vacationId]);
        return Boolean(result.affectedRows);
    }

    public async getUserFollows(id: string): Promise<DTO[]> {
        const follows = (await query(`
            SELECT userId, vacationId
            FROM   followers
            WHERE  userId = ?
        `, [id]));
        return follows;
    }

    public async getVacationsFollowsNumber(id: string): Promise<number> {
        const queryResult: RowDataPacket[] = await query(`
            SELECT COUNT(*) AS followerCount
            FROM               followers
            WHERE              vacationId = ?
        `, [id]);
        const followerCount: number = queryResult[0].followerCount;
        return followerCount;
    }

    public async getAllVacationsFollows(): Promise<DTO[]> {
        const countedFollows = (await query(`
            SELECT v.destination as Destination,
                   count(f.userId) as Followers
            FROM   vacations AS v
            LEFT JOIN followers AS f on f.vacationId = v.vacationId
            GROUP BY v.vacationId 
        `,));
        return countedFollows;
    }
}

const followers = new Followers();
export default followers;