import { atom } from "recoil";

export const usersCurrentRegionSelectedState = atom<number | undefined>({
    key: "usersCurrentRegionSelectedState",
    default: undefined
});
