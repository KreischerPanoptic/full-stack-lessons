import { atom } from "recoil";

export const userCurrentUsernameErrorState = atom<string | undefined>({
    key: "userCurrentUsernameErrorState",
    default: undefined,
});
