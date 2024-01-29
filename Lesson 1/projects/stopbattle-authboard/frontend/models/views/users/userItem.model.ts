export default class UserItemModel {
    key: string | undefined | null;
    username: string | undefined | null;
    firstName: string | '-' = '-';
    lastName: string | '-' = '-';
    patronymic: string | '-' = '-';
    position: string | '-' = '-';
    rank: string | '-' = '-';
    region: string = '';
    isEnabled: boolean = true;
    isTOTPEnabled: boolean = false;
    isLockedOut: boolean = false;
    role: 'admin' | 'reader' | 'creator' | 'volunteer' = 'volunteer';
}
