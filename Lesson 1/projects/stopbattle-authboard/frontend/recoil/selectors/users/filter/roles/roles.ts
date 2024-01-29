import { selector } from "recoil";
import {usersFilterRolesOptionsState} from "../../../../atoms/users/filter/roles/roles";

export const usersFilterRolesOptionsValueState = selector({
    key: "usersFilterRolesOptionsValueState",
    get: ({ get }) => {
        const items = get(usersFilterRolesOptionsState);
        return items;
    }
});
