import { atom } from "recoil";

export const regionsGetModeState = atom<'filtered' | 'all' | 'page'>({
    key: "regionsGetModeState",
    default: 'page'
});
