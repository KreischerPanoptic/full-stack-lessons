import { atom } from "recoil";

export const usersFilterRegionsOptionsState = atom<string[]>({
    key: "usersFilterRegionsOptionsState",
    default: [],
    dangerouslyAllowMutability: true
});
