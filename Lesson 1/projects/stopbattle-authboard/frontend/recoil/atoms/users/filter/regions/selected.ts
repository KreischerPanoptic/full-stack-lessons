import { atom } from "recoil";

export const usersFilterRegionsSelectedState = atom<string[]>({
    key: "usersFilterRegionsSelectedState",
    default: [],
    dangerouslyAllowMutability: true
});
