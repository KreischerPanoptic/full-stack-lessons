import { atom } from "recoil";

export const userCurrentPositionValidState = atom<boolean>({
    key: "userCurrentPositionValidState",
    default: true,
});
