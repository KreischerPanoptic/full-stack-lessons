import { selector } from "recoil";
import {usersFilterLastNamesOptionsState} from "../../../../atoms/users/filter/lastNames/lastNames";

export const usersFilterLastNamesOptionsValueState = selector({
    key: "usersFilterLastNamesOptionsValueState",
    get: ({ get }) => {
        const items = get(usersFilterLastNamesOptionsState);
        return items;
    }
});
