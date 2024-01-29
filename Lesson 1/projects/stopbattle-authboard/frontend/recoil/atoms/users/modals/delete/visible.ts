import { atom } from "recoil";

export const usersDeleteModalVisibleState = atom<boolean>({
    key: "usersDeleteModalVisibleState",
    default: false
});
