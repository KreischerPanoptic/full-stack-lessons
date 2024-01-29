import { atom } from "recoil";

export const totpEnabledState = atom({
    key: "totpEnabledState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});
