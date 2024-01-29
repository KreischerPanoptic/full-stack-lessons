import { atom } from "recoil";

export const profileCurrentFirstNameState = atom<string>({
    key: "profileCurrentFirstNameState",
    default: '',
});
