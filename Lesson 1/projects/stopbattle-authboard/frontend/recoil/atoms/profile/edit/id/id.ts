import { atom } from "recoil";

export const profileCurrentIdState = atom<number>({
    key: "profileCurrentIdState",
    default: 0,
});
