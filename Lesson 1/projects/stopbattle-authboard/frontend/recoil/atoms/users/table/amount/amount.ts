import { atom } from "recoil";

export const usersAmountState = atom<number>({
    key: "usersAmountState",
    default: -1,
});
