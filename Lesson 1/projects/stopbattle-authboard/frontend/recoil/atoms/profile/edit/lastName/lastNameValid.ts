import { atom } from "recoil";

export const profileCurrentLastNameValidState = atom<boolean>({
    key: "profileCurrentLastNameValidState",
    default: true,
});
