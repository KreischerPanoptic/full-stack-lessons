import { atom } from "recoil";

export const userCurrentFirstNameErrorState = atom<string | undefined>({
    key: "userCurrentFirstNameErrorState",
    default: undefined,
});
