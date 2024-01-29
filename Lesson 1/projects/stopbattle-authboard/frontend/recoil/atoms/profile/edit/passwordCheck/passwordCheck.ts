import { atom } from "recoil";

export const profileCurrentPasswordCheckState = atom<string>({
    key: "profileCurrentPasswordCheckState",
    default: '',
});
