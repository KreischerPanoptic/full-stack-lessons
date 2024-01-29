export default class UserModelResponse {
    id: number = -1;
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    patronymic: string = '';
    position: string = '';
    rank: string = '';
    regionId: number = 1;
    region: string = '';
    enabled: boolean = true;
    totpEnabled: boolean = false;
    lockedOut: boolean = false;
    role: 'admin' | 'reader' | 'creator' | 'volunteer' = 'volunteer';
}
