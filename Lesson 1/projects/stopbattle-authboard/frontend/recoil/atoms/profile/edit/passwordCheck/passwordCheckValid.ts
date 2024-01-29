import { atom } from "recoil";

export const profileCurrentPasswordCheckValidState = atom<boolean>({
    key: "profileCurrentPasswordCheckValidState",
    default: true,
});
