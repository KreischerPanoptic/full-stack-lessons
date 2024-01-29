import { selector } from "recoil";
import {usersCurrentRoleSelectedState} from "../../../../../atoms/users/edit/simple/role/role";

export const usersCurrentRoleSelectedValueState = selector({
    key: "usersCurrentRoleSelectedValueState",
    get: ({ get }) => {
        const role = get(usersCurrentRoleSelectedState);
        return role;
    }
});
