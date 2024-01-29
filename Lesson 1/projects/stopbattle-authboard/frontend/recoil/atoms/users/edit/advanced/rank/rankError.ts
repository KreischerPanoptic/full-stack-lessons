import { atom } from "recoil";

export const userCurrentRankErrorState = atom<string | undefined>({
    key: "userCurrentRankErrorState",
    default: undefined,
});
