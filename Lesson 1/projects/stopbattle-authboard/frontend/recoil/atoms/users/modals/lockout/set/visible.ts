import { atom } from "recoil";

export const usersSetLockoutModalVisibleState = atom<boolean>({
    key: "usersSetLockoutModalVisibleState",
    default: false
});
