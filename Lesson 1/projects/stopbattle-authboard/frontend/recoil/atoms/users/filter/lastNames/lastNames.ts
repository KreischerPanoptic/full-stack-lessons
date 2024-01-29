import { atom } from "recoil";

export const usersFilterLastNamesOptionsState = atom<string[]>({
    key: "usersFilterLastNamesOptionsState",
    default: [],
    dangerouslyAllowMutability: true
});
