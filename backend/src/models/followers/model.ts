import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>
    getOne(id: string): Promise<DTO>;
    follow(follower: DTO): Promise<DTO>;
    unFollow(id: string): Promise<boolean>;

}