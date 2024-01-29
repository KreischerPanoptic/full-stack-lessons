import { selector } from "recoil";
import {profileCurrentPasswordState} from "../../../../atoms/profile/edit/password/password";

export const profileCurrentPasswordValueState = selector({
    key: "profileCurrentPasswordValueState",
    get: ({ get }) => {
        const password = get(profileCurrentPasswordState);
        return password;
    }
});
