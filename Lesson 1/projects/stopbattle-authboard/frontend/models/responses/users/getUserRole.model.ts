export default class GetUserRoleModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    role: 'admin' | 'reader' | 'creator' | 'volunteer' | undefined | null;
    admin: boolean | undefined | null;
}
