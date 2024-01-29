import { atom } from "recoil";

export const networkErrorState = atom<string | undefined>({
    key: "networkErrorState",
    default: undefined,
});
