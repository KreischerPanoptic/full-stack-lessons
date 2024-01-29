import { atom } from "recoil";

export const ipState = atom<string | undefined>({
    key: "ipState",
    default: undefined,
});
