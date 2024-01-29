import { atom } from "recoil";

export const regionsCurrentPageState = atom<number>({
    key: "regionsCurrentPageState",
    default: 1,
});
