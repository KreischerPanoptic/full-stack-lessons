import UserModelResponse from "./user.model";

export default class ResetUserSecurityModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    reset: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
