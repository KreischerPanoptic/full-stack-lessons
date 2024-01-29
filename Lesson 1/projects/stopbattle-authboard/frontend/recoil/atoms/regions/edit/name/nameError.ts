import { atom } from "recoil";

export const regionCurrentNameErrorState = atom<string | undefined>({
    key: "regionCurrentNameErrorState",
    default: undefined,
});
