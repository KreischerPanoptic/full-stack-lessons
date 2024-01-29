import { atom } from "recoil";

export const regionCurrentNameValidState = atom<boolean>({
    key: "regionCurrentNameValidState",
    default: true,
});
