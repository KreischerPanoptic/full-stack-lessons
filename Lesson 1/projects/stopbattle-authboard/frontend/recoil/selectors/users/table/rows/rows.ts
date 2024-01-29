import { selector } from "recoil";
import {usersRowsState} from "../../../../atoms/users/table/rows/rows";

export const usersRowsValueState = selector({
    key: "usersRowsValueState",
    get: ({ get }) => {
        const rows = get(usersRowsState);
        return rows;
    }
});

