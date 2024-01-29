import { atom } from "recoil";

export const usersFilterArchivedState = atom<boolean>({
    key: "usersFilterArchivedState",
    default: false
});
