import { selector } from "recoil";
import {profileCurrentRoleSelectedState} from "../../../../atoms/profile/edit/role/role";

export const profileCurrentRoleSelectedValueState = selector({
    key: "profileCurrentRoleSelectedValueState",
    get: ({ get }) => {
        const role = get(profileCurrentRoleSelectedState);
        return role;
    }
});
