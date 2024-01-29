import { selector } from "recoil";
import {regionsCurrentPageState} from "../../../../atoms/regions/table/page/page";

export const regionsCurrentPageValueState = selector({
    key: "regionsCurrentPageValueState",
    get: ({ get }) => {
        const current = get(regionsCurrentPageState);
        return current;
    }
});

