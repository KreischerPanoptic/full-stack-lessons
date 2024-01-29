import { selector } from "recoil";
import {profileCurrentPasswordConfirmationValidState} from "../../../../atoms/profile/edit/passwordConfirmation/passwordConfirmationValid";

export const profileCurrentPasswordConfirmationValidValueState = selector({
    key: "profileCurrentPasswordConfirmationValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentPasswordConfirmationValidState);
        return valid;
    }
});

