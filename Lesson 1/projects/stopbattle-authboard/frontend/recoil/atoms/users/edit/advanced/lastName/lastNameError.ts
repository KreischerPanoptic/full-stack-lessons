import { atom } from "recoil";

export const userCurrentLastNameErrorState = atom<string | undefined>({
    key: "userCurrentLastNameErrorState",
    default: undefined,
});
