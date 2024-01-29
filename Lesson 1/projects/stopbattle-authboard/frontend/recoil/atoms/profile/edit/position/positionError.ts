import { atom } from "recoil";

export const profileCurrentPositionErrorState = atom<string | undefined>({
    key: "profileCurrentPositionErrorState",
    default: undefined,
});
