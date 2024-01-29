import { selector } from "recoil";
import {usersFilterUsernamesSelectedState} from "../../../../atoms/users/filter/usernames/selected";

export const usersFilterUsernamesSelectedValueState = selector({
    key: "usersFilterUsernamesSelectedValueState",
    get: ({ get }) => {
        const items = get(usersFilterUsernamesSelectedState);
        return items;
    }
});
