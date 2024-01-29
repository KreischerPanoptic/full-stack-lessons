import { atom } from "recoil";

export const usersCurrentPageState = atom<number>({
    key: "usersCurrentPageState",
    default: 1,
});
