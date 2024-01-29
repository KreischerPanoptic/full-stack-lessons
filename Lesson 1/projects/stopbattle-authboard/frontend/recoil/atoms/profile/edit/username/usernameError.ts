import { atom } from "recoil";

export const profileCurrentUsernameErrorState = atom<string | undefined>({
    key: "profileCurrentUsernameErrorState",
    default: undefined,
});
