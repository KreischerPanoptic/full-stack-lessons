import { selector } from "recoil";
import {profileCurrentLastNameValidState} from "../../../../atoms/profile/edit/lastName/lastNameValid";

export const profileCurrentLastNameValidValueState = selector({
    key: "profileCurrentLastNameValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentLastNameValidState);
        return valid;
    }
});

