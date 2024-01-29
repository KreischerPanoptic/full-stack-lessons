import { atom } from "recoil";

export const profileCurrentLastNameErrorState = atom<string | undefined>({
    key: "profileCurrentLastNameErrorState",
    default: undefined,
});
