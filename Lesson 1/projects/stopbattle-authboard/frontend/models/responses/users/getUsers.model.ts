import UserModelResponse from "./user.model";

export default class GetUsersModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    count: number = 0;
    page: number = 1;
    amount: number = -1;
    users: UserModelResponse[] = [];
}
