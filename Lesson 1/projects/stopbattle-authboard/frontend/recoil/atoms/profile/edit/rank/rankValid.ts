import { atom } from "recoil";

export const profileCurrentRankValidState = atom<boolean>({
    key: "profileCurrentRankValidState",
    default: true,
});
