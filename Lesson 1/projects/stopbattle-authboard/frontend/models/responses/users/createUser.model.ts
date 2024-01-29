import UserModelResponse from "./user.model";

export default class CreateUserModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    created: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
