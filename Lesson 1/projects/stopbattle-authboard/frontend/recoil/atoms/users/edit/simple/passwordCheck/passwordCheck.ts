import { atom } from "recoil";

export const userCurrentPasswordCheckState = atom<string>({
    key: "userCurrentPasswordCheckState",
    default: '',
});
