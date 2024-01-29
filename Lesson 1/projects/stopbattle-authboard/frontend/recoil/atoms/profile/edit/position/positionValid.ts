import { atom } from "recoil";

export const profileCurrentPositionValidState = atom<boolean>({
    key: "profileCurrentPositionValidState",
    default: true,
});
