import { atom } from "recoil";

export const regionsCountState = atom<number>({
    key: "regionsCountState",
    default: 0,
});
