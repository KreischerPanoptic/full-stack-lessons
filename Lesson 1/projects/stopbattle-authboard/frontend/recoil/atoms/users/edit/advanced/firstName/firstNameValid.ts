import { atom } from "recoil";

export const userCurrentFirstNameValidState = atom<boolean>({
    key: "userCurrentFirstNameValidState",
    default: true,
});
