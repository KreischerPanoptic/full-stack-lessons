import { atom } from "recoil";

export const userCurrentPasswordConfirmationValidState = atom<boolean>({
    key: "userCurrentPasswordConfirmationValidState",
    default: true,
});
