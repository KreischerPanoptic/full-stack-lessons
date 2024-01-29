export default class RefreshModelRequest {
    username: string | undefined | null;
    token: string | undefined | null;
    isRefreshNeeded: boolean = false;
}
