import { atom } from "recoil";

export const userCurrentPasswordErrorState = atom<string | undefined>({
    key: "userCurrentPasswordErrorState",
    default: undefined,
});
