import { atom } from "recoil";

export const userCurrentPatronymicValidState = atom<boolean>({
    key: "userCurrentPatronymicValidState",
    default: true,
});
