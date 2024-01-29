import { atom } from "recoil";

export const userCurrentPasswordConfirmationState = atom<string>({
    key: "userCurrentPasswordConfirmationState",
    default: '',
});
