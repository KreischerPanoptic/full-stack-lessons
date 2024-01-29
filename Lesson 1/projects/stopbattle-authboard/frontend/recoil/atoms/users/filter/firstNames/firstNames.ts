import { atom } from "recoil";

export const usersFilterFirstNamesOptionsState = atom<string[]>({
    key: "usersFilterFirstNamesOptionsState",
    default: [],
    dangerouslyAllowMutability: true
});
