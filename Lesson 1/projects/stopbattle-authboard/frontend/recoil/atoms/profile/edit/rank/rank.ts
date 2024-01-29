import { atom } from "recoil";

export const profileCurrentRankState = atom<string>({
    key: "profileCurrentRankState",
    default: '',
});
