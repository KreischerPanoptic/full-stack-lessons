export default class EditUserModelRequest {
    id: number = -1;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    patronymic: string | undefined | null;
    position: string | undefined | null;
    rank: string | undefined | null;
    password: string | undefined | null;
    newPassword: string | undefined | null;
    confirmPassword: string | undefined | null;
}
