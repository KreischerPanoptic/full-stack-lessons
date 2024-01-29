import { selector } from "recoil";
import {profileCurrentPasswordConfirmationErrorState} from "../../../../atoms/profile/edit/passwordConfirmation/passwordConfirmationError";

export const profileCurrentPasswordConfirmationErrorValueState = selector({
    key: "profileCurrentPasswordConfirmationErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentPasswordConfirmationErrorState);
        return error;
    }
});

