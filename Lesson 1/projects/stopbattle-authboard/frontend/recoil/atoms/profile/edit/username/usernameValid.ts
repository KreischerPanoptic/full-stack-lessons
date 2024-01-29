import { atom } from "recoil";

export const profileCurrentUsernameValidState = atom<boolean>({
    key: "profileCurrentUsernameValidState",
    default: true,
});
