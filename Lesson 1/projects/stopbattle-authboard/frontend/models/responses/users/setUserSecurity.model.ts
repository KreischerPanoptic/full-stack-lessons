import UserModelResponse from "./user.model";

export default class SetUserSecurityModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    set: boolean | undefined | null;
    user: UserModelResponse | undefined | null;
}
