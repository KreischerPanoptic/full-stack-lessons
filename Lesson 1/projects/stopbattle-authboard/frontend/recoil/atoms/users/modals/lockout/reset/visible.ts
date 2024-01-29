import { atom } from "recoil";

export const usersResetLockoutModalVisibleState = atom<boolean>({
    key: "usersResetLockoutModalVisibleState",
    default: false
});
