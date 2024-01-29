import UserModelResponse from "./user.model";

export default class GetCurrentUserModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    loggedIn: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
