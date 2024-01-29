import { selector } from "recoil";
import {profileCurrentUsernameState} from "../../../../atoms/profile/edit/username/username";

export const profileCurrentUsernameValueState = selector({
    key: "profileCurrentUsernameValueState",
    get: ({ get }) => {
        const username = get(profileCurrentUsernameState);
        return username;
    }
});

