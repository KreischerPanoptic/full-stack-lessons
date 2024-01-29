import UserModelResponse from "./user.model";

export default class UpdateUserModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    updated: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
