import { atom } from "recoil";

export const userCurrentPositionState = atom<string>({
    key: "userCurrentPositionState",
    default: '',
});
