import { atom } from "recoil";

export const profileCurrentPatronymicState = atom<string>({
    key: "profileCurrentPatronymicState",
    default: '',
});
