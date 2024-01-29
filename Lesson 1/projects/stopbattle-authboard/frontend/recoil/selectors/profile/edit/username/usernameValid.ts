import { selector } from "recoil";
import {profileCurrentUsernameValidState} from "../../../../atoms/profile/edit/username/usernameValid";

export const profileCurrentUsernameValidValueState = selector({
    key: "profileCurrentUsernameValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentUsernameValidState);
        return valid;
    }
});

