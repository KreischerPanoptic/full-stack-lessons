import { atom } from "recoil";

export const usersFilterFirstNamesSelectedState = atom<string[]>({
    key: "usersFilterFirstNamesSelectedState",
    default: [],
    dangerouslyAllowMutability: true
});
