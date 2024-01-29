import { selector } from "recoil";
import {usersCurrentRoleSelectedState} from "../../../../../atoms/users/edit/simple/role/role";

export const usersCurrentRoleSelectedValidValueState = selector({
    key: "usersCurrentRoleSelectedValidValueState",
    get: ({ get }) => {
        const role = get(usersCurrentRoleSelectedState);
        let valid = role.length > 0;
        return valid;
    }
});

