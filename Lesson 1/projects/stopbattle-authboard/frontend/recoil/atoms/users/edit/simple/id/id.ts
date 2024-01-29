import { atom } from "recoil";

export const userCurrentIdState = atom<number>({
    key: "userCurrentIdState",
    default: 0,
});
