import { atom } from "recoil";

export const regionsFilterActiveState = atom<boolean>({
    key: "regionsFilterActiveState",
    default: true
});
