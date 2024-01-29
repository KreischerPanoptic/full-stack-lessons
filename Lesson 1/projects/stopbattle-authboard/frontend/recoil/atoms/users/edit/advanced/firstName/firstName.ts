import { atom } from "recoil";

export const userCurrentFirstNameState = atom<string>({
    key: "userCurrentFirstNameState",
    default: '',
});
