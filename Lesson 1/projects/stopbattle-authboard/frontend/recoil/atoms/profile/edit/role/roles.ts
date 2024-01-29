import { atom } from "recoil";

export const profileCurrentRolesOptionsState = atom<string[]>({
    key: "profileCurrentRolesOptionsState",
    default: []
});
