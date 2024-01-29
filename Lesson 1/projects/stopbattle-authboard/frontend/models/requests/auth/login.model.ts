export default class LoginModelRequest {
    username: string | undefined | null;
    password: string | undefined | null;
    code: string | undefined | null = undefined;
    rememberMe: boolean = true;
}
