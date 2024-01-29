import { atom } from "recoil";

export const usersLoadingState = atom({
    key: "usersLoadingState",
    default: false,
});
