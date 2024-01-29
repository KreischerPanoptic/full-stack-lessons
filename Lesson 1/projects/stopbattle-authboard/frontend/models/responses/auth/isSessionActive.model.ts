export default class IsSessionActiveModelResponse {
    active: boolean | undefined | null;
    sessionStart: string | undefined | null;
    sessionEnd: string | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
}
