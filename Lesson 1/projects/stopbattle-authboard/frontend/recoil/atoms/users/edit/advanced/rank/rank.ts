import { atom } from "recoil";

export const userCurrentRankState = atom<string>({
    key: "userCurrentRankState",
    default: '',
});
