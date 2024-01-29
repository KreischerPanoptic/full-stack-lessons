import { atom } from "recoil";

export const profileCurrentFirstNameValidState = atom<boolean>({
    key: "profileCurrentFirstNameValidState",
    default: true,
});
