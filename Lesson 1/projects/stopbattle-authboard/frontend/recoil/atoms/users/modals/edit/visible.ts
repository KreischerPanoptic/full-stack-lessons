import { atom } from "recoil";

export const usersEditModalVisibleState = atom<boolean>({
    key: "usersEditModalVisibleState",
    default: false
});
