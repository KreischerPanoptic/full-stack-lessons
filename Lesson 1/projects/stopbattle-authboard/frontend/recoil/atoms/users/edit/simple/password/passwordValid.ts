import { atom } from "recoil";

export const userCurrentPasswordValidState = atom<boolean>({
    key: "userCurrentPasswordValidState",
    default: true,
});
