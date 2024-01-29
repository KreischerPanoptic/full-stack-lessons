export default class IsTokenActiveModelResponse {
    exists: boolean | undefined | null;
    active: boolean | undefined | null;
    issuedAt: string | undefined | null;
    expiresAt: string | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
}
