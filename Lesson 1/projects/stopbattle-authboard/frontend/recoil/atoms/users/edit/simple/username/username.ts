import { atom } from "recoil";

export const userCurrentUsernameState = atom<string>({
    key: "userCurrentUsernameState",
    default: '',
});
