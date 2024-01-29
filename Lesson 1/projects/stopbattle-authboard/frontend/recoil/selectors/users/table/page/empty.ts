import { selector } from "recoil";
import {usersAllPagesValueState} from "./pages";

export const usersEmptyValueState = selector({
    key: "usersEmptyValueState",
    get: ({ get }) => {
        const isEmpty = get(usersAllPagesValueState) <= 0;
        return isEmpty;
    }
});

