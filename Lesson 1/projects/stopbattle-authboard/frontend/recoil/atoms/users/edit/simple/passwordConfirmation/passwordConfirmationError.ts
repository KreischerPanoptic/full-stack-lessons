import { atom } from "recoil";

export const userCurrentPasswordConfirmationErrorState = atom<string | undefined>({
    key: "userCurrentPasswordConfirmationErrorState",
    default: undefined,
});
