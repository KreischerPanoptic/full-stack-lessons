import { atom } from "recoil";

export const profileCurrentLastNameState = atom<string>({
    key: "profileCurrentLastNameState",
    default: '',
});
