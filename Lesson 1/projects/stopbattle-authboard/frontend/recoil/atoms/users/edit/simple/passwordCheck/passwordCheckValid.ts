import { atom } from "recoil";

export const userCurrentPasswordCheckValidState = atom<boolean>({
    key: "userCurrentPasswordCheckValidState",
    default: true,
});
