import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>
    getOne(id: string): Promise<DTO>;
    getUserFollows(id: string): Promise<DTO[]>;
    follow(follower: DTO): Promise<DTO>;
    unFollow(follower: DTO): Promise<boolean>;
    getVacationsFollowsNumber(id: string): Promise<number>;
    getAllVacationsFollows(): Promise<DTO[]>

}