import { atom } from "recoil";

export const profileCurrentPasswordCheckErrorState = atom<string | undefined>({
    key: "profileCurrentPasswordCheckErrorState",
    default: undefined,
});
