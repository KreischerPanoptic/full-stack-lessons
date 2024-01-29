import { atom } from "recoil";

export const profileCurrentPasswordValidState = atom<boolean>({
    key: "profileCurrentPasswordValidState",
    default: true,
});
