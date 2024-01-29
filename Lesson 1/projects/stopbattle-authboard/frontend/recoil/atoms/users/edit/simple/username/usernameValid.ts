import { atom } from "recoil";

export const userCurrentUsernameValidState = atom<boolean>({
    key: "userCurrentUsernameValidState",
    default: true,
});
