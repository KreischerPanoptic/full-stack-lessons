import { atom } from "recoil";

export const regionsAmountState = atom<number>({
    key: "regionsAmountState",
    default: -1,
});
