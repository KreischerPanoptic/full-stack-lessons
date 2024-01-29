import { selector } from "recoil";
import {profileCurrentUsernameErrorState} from "../../../../atoms/profile/edit/username/usernameError";

export const profileCurrentUsernameErrorValueState = selector({
    key: "profileCurrentUsernameErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentUsernameErrorState);
        return error;
    }
});

