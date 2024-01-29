import { atom } from "recoil";

export const profileCurrentPasswordConfirmationErrorState = atom<string | undefined>({
    key: "profileCurrentPasswordConfirmationErrorState",
    default: undefined,
});
