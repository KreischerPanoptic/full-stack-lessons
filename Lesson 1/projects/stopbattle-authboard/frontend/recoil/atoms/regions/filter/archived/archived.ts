import { atom } from "recoil";

export const regionsFilterArchivedState = atom<boolean>({
    key: "regionsFilterArchivedState",
    default: false
});
