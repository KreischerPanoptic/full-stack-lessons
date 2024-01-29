import { atom } from "recoil";

export const usersFilterLastNamesSelectedState = atom<string[]>({
    key: "usersFilterLastNamesSelectedState",
    default: [],
    dangerouslyAllowMutability: true
});
