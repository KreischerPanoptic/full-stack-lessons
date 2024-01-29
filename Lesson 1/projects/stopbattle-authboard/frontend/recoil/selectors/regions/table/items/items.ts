import { selector } from "recoil";
import {regionsItemsState} from "../../../../atoms/regions/table/items/items";

export const regionsItemsValueState = selector({
    key: "regionsItemsValueState",
    get: ({ get }) => {
        const items = get(regionsItemsState);
        return items;
    }
});

