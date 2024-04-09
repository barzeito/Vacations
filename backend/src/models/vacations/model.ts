import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>;
    getOne(id: string): Promise<DTO>;
    add(vacation: DTO): Promise<DTO>;
    update(vacation: DTO): Promise<DTO>;
    remove(id: string): Promise<boolean>;
    //getAllByFollow(): Promise<DTO[]>;
    getAllByStartDate(date: string): Promise<DTO[]>;
    getAllByBetweenDates(): Promise<DTO[]>;

}