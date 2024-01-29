import UserModelResponse from "./user.model";

export default class DeleteUserModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    deleted: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
