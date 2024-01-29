import { atom } from "recoil";

export const profileCurrentUsernameState = atom<string>({
    key: "profileCurrentUsernameState",
    default: '',
});
