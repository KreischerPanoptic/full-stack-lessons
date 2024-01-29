import { selector } from "recoil";
import {usersFilterRolesSelectedState} from "../../../../atoms/users/filter/roles/selected";

export const usersFilterRolesSelectedValueState = selector({
    key: "usersFilterRolesSelectedValueState",
    get: ({ get }) => {
        const items = get(usersFilterRolesSelectedState);
        return items;
    }
});
