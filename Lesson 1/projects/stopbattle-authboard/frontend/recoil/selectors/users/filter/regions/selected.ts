import { selector } from "recoil";
import {usersFilterRegionsSelectedState} from "../../../../atoms/users/filter/regions/selected";

export const usersFilterRegionsSelectedValueState = selector({
    key: "usersFilterRegionsSelectedValueState",
    get: ({ get }) => {
        const items = get(usersFilterRegionsSelectedState);
        return items;
    }
});
