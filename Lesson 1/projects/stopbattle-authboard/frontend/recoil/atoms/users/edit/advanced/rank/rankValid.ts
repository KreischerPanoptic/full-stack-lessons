import { atom } from "recoil";

export const userCurrentRankValidState = atom<boolean>({
    key: "userCurrentRankValidState",
    default: true,
});
