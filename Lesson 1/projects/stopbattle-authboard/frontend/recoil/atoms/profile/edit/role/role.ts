import { atom } from "recoil";

export const profileCurrentRoleSelectedState = atom<string>({
    key: "profileCurrentRoleSelectedState",
    default: ''
});
