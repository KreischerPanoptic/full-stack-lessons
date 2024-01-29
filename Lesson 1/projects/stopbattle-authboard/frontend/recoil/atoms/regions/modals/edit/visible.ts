import { atom } from "recoil";

export const regionsEditModalVisibleState = atom<boolean>({
    key: "regionsEditModalVisibleState",
    default: false
});
