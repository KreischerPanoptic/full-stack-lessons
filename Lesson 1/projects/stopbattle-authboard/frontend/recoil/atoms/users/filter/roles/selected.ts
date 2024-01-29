import { atom } from "recoil";

export const usersFilterRolesSelectedState = atom<string[]>({
    key: "usersFilterRolesSelectedState",
    default: [],
    dangerouslyAllowMutability: true
});
