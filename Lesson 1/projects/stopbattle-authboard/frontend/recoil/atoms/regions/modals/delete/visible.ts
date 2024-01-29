import { atom } from "recoil";

export const regionsDeleteModalVisibleState = atom<boolean>({
    key: "regionsDeleteModalVisibleState",
    default: false
});
