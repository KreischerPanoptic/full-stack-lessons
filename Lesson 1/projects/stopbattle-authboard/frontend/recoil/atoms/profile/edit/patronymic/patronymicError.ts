import { atom } from "recoil";

export const profileCurrentPatronymicErrorState = atom<string | undefined>({
    key: "profileCurrentPatronymicErrorState",
    default: undefined,
});
