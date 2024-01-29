import { atom } from "recoil";

export const profileCurrentPasswordConfirmationValidState = atom<boolean>({
    key: "profileCurrentPasswordConfirmationValidState",
    default: true,
});
