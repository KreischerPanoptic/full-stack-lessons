import { selector } from "recoil";
import {profileCurrentPasswordValidState} from "../../../../atoms/profile/edit/password/passwordValid";

export const profileCurrentPasswordValidValueState = selector({
    key: "profileCurrentPasswordValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentPasswordValidState);
        return valid;
    }
});

