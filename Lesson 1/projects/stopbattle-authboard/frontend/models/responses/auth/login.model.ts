export default class LoginModelResponse {
    generated: boolean | undefined | null;
    authenticatorNeeded: boolean | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
    token: string | undefined | null;
}
