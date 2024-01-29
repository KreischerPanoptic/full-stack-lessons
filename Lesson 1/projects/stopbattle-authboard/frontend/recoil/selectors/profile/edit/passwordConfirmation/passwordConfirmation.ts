import { selector } from "recoil";
import {profileCurrentPasswordConfirmationState} from "../../../../atoms/profile/edit/passwordConfirmation/passwordConfirmation";

export const profileCurrentPasswordConfirmationValueState = selector({
    key: "profileCurrentPasswordConfirmationValueState",
    get: ({ get }) => {
        const password = get(profileCurrentPasswordConfirmationState);
        return password;
    }
});
