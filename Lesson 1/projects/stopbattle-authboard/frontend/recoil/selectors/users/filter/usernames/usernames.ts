import { selector } from "recoil";
import {usersFilterUsernamesOptionsState} from "../../../../atoms/users/filter/usernames/usernames";

export const usersFilterUsernamesOptionsValueState = selector({
    key: "usersFilterUsernamesOptionsValueState",
    get: ({ get }) => {
        const items = get(usersFilterUsernamesOptionsState);
        return items;
    }
});
