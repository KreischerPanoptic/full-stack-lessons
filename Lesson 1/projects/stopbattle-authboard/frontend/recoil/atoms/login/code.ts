import { atom } from "recoil";

export const totpCodeState = atom<string>({
    key: "totpCodeState", // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
