import { atom } from "recoil";

export const profileCurrentPositionState = atom<string>({
    key: "profileCurrentPositionState",
    default: '',
});
