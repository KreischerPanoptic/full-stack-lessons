import { atom } from "recoil";

export const profileCurrentPatronymicValidState = atom<boolean>({
    key: "profileCurrentPatronymicValidState",
    default: true,
});
