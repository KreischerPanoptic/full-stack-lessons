import { selector } from "recoil";
import {usersFilterFirstNamesSelectedState} from "../../../../atoms/users/filter/firstNames/selected";

export const usersFilterFirstNamesSelectedValueState = selector({
    key: "usersFilterFirstNamesSelectedValueState",
    get: ({ get }) => {
        const items = get(usersFilterFirstNamesSelectedState);
        return items;
    }
});
