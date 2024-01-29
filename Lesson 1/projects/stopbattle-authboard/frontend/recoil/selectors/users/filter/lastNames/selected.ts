import { selector } from "recoil";
import {usersFilterLastNamesSelectedState} from "../../../../atoms/users/filter/lastNames/selected";

export const usersFilterLastNamesSelectedValueState = selector({
    key: "usersFilterLastNamesSelectedValueState",
    get: ({ get }) => {
        const items = get(usersFilterLastNamesSelectedState);
        return items;
    }
});
