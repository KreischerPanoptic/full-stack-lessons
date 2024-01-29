export default class CreateUserModelRequest {
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    patronymic: string | undefined | null;
    position: string | undefined | null;
    rank: string | undefined | null;
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    regionId: number = -1;
    role: 'reader' | 'creator' | 'volunteer' = 'volunteer';
}
