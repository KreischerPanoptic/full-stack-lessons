import { atom } from "recoil";

export const usersResetTOTPModalVisibleState = atom<boolean>({
    key: "usersResetTOTPModalVisibleState",
    default: false
});
