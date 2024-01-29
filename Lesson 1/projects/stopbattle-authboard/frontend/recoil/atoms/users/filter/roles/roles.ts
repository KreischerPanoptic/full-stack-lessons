import { atom } from "recoil";

export const usersFilterRolesOptionsState = atom<string[]>({
    key: "usersFilterRolesOptionsState",
    default: [],
    dangerouslyAllowMutability: true
});
