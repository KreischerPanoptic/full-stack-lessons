export default class UpdateUserModelRequest {
    id: number = -1;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    patronymic: string | undefined | null;
    position: string | undefined | null;
    rank: string | undefined | null;
    username: string | undefined | null;
    password: string | undefined | null;
    confirmPassword: string | undefined | null;
    regionId: number | undefined | null;
    role: 'reader' | 'creator' | 'volunteer' | undefined | null;
}
