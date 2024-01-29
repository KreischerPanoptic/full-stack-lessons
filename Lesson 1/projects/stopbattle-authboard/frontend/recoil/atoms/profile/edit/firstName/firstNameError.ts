import { atom } from "recoil";

export const profileCurrentFirstNameErrorState = atom<string | undefined>({
    key: "profileCurrentFirstNameErrorState",
    default: undefined,
});
