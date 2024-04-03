import CredentialsDTO from './credential-dto';
import UserDTO from './user-dto';

export default interface Model {
    getOne(userId: string): Promise<UserDTO>;
    login(credentials: CredentialsDTO): Promise<UserDTO>;
    signUp(user: UserDTO): Promise<UserDTO>;
    getByEmail(email: string): Promise<UserDTO | null>;
    isAdmin(id: string): Promise<boolean>;

}