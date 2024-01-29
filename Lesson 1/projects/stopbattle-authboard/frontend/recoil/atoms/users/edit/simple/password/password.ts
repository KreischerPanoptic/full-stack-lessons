import { atom } from "recoil";

export const userCurrentPasswordState = atom<string>({
    key: "userCurrentPasswordState",
    default: '',
});
