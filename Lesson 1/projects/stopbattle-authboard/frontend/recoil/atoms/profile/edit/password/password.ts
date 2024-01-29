import { atom } from "recoil";

export const profileCurrentPasswordState = atom<string>({
    key: "profileCurrentPasswordState",
    default: '',
});
