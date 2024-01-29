import { selector } from "recoil";
import {usersFilterFirstNamesOptionsState} from "../../../../atoms/users/filter/firstNames/firstNames";

export const usersFilterFirstNamesOptionsValueState = selector({
    key: "usersFilterFirstNamesOptionsValueState",
    get: ({ get }) => {
        const items = get(usersFilterFirstNamesOptionsState);
        return items;
    }
});
