import { selector } from "recoil";
import {usersFilterRegionsOptionsState} from "../../../../atoms/users/filter/regions/regions";

export const usersFilterRegionsOptionsValueState = selector({
    key: "usersFilterRegionsOptionsValueState",
    get: ({ get }) => {
        const items = get(usersFilterRegionsOptionsState);
        return items;
    }
});
