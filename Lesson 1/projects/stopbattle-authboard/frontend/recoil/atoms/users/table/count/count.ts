import { atom } from "recoil";

export const usersCountState = atom<number>({
    key: "usersCountState",
    default: 0,
});
