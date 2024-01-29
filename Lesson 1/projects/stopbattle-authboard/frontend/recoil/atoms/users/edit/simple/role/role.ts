import { atom } from "recoil";

export const usersCurrentRoleSelectedState = atom<string>({
    key: "usersCurrentRoleSelectedState",
    default: ''
});
