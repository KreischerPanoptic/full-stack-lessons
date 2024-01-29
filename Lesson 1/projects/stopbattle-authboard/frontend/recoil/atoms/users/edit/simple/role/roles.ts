import { atom } from "recoil";

export const usersCurrentRolesOptionsState = atom<string[]>({
    key: "usersCurrentRolesOptionsState",
    default: []
});
