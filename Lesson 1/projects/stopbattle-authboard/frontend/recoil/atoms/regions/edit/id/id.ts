import { atom } from "recoil";

export const regionCurrentIdState = atom<number>({
    key: "regionCurrentIdState",
    default: 0,
});
