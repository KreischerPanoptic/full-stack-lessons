import { atom } from "recoil";

export const loginErrorState = atom<string | undefined>({
    key: "loginErrorState",
    default: undefined,
});
