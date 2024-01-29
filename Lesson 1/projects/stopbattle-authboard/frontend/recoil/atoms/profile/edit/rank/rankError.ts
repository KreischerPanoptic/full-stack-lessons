import { atom } from "recoil";

export const profileCurrentRankErrorState = atom<string | undefined>({
    key: "profileCurrentRankErrorState",
    default: undefined,
});
