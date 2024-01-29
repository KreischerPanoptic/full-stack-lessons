import { atom } from "recoil";

export const profileCurrentPasswordErrorState = atom<string | undefined>({
    key: "profileCurrentPasswordErrorState",
    default: undefined,
});
