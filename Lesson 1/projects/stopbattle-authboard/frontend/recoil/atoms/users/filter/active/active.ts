import { atom } from "recoil";

export const usersFilterActiveState = atom<boolean>({
    key: "usersFilterActiveState",
    default: true
});
