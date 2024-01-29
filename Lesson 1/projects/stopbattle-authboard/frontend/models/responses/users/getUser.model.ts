import UserModelResponse from "./user.model";

export default class GetUserModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    user: UserModelResponse | undefined | null;
}
