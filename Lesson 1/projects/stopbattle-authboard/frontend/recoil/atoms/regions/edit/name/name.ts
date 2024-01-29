import { atom } from "recoil";

export const regionCurrentNameState = atom<string>({
    key: "regionCurrentNameState",
    default: '',
});
