import { selector } from "recoil";
import {regionsRowsState} from "../../../../atoms/regions/table/rows/rows";

export const regionsRowsValueState = selector({
    key: "regionsRowsValueState",
    get: ({ get }) => {
        const rows = get(regionsRowsState);
        return rows;
    }
});

