import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>
    getOne(id: string): Promise<DTO>;
    getFollows(id: string): Promise<DTO[]>;
    follow(follower: DTO): Promise<DTO>;
    unFollow(id: string): Promise<boolean>;
    followsCounter(id: string): Promise<number>;
    countAllFollows(): Promise<DTO[]>

}