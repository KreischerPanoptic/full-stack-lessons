import { atom } from "recoil";

export const usersCreateModalVisibleState = atom<boolean>({
    key: "usersCreateModalVisibleState",
    default: false
});
