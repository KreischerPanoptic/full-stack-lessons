import { atom } from "recoil";

export const userCurrentPatronymicErrorState = atom<string | undefined>({
    key: "userCurrentPatronymicErrorState",
    default: undefined,
});
