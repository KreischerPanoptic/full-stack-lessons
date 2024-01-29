import { atom } from "recoil";

export const usersFilterUsernamesSelectedState = atom<string[]>({
    key: "usersFilterUsernamesSelectedState",
    default: [],
    dangerouslyAllowMutability: true
});
