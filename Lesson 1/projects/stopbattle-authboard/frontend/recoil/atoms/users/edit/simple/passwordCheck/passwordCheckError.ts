import { atom } from "recoil";

export const userCurrentPasswordCheckErrorState = atom<string | undefined>({
    key: "userCurrentPasswordCheckErrorState",
    default: undefined,
});
