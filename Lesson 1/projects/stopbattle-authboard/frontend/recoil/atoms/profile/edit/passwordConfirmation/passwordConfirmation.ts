import { atom } from "recoil";

export const profileCurrentPasswordConfirmationState = atom<string>({
    key: "profileCurrentPasswordConfirmationState",
    default: '',
});
