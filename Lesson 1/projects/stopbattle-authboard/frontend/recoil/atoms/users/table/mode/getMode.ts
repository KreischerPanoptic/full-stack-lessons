import { atom } from "recoil";

export const usersGetModeState = atom<'filtered' | 'all' | 'page'>({
    key: "usersGetModeState",
    default: 'page'
});
