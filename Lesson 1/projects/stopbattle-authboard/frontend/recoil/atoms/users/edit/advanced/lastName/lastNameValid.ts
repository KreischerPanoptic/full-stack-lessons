import { atom } from "recoil";

export const userCurrentLastNameValidState = atom<boolean>({
    key: "userCurrentLastNameValidState",
    default: true,
});
