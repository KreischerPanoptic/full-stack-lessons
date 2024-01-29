import { atom } from "recoil";

export const userCurrentLastNameState = atom<string>({
    key: "userCurrentLastNameState",
    default: '',
});
