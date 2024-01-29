import { selector } from "recoil";
import {usersItemsState} from "../../../../atoms/users/table/items/items";

export const usersItemsValueState = selector({
    key: "usersItemsValueState",
    get: ({ get }) => {
        const items = get(usersItemsState);
        return items;
    }
});

