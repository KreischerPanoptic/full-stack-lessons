import { selector } from "recoil";
import {profileCurrentLastNameState} from "../../../../atoms/profile/edit/lastName/lastName";

export const profileCurrentLastNameValueState = selector({
    key: "profileCurrentLastNameValueState",
    get: ({ get }) => {
        const username = get(profileCurrentLastNameState);
        return username;
    }
});

