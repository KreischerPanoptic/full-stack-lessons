import { selector } from "recoil";
import {profileCurrentRoleSelectedState} from "../../../../atoms/profile/edit/role/role";

export const profileCurrentRoleSelectedValidValueState = selector({
    key: "profileCurrentRoleSelectedValidValueState",
    get: ({ get }) => {
        const role = get(profileCurrentRoleSelectedState);
        let valid = role.length > 0;
        return valid;
    }
});

