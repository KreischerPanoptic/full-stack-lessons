import { atom } from "recoil";

export const usersFilterUsernamesOptionsState = atom<string[]>({
    key: "usersFilterUsernamesOptionsState",
    default: [],
    dangerouslyAllowMutability: true
});
