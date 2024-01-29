import { atom } from "recoil";

export const userCurrentPatronymicState = atom<string>({
    key: "userCurrentPatronymicState",
    default: '',
});
