import { selector } from "recoil";
import {regionsAllPagesValueState} from "./pages";

export const regionsEmptyValueState = selector({
    key: "regionsEmptyValueState",
    get: ({ get }) => {
        const isEmpty = get(regionsAllPagesValueState) <= 0;
        return isEmpty;
    }
});

