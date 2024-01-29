import { atom } from "recoil";

export const userCurrentPositionErrorState = atom<string | undefined>({
    key: "userCurrentPositionErrorState",
    default: undefined,
});
