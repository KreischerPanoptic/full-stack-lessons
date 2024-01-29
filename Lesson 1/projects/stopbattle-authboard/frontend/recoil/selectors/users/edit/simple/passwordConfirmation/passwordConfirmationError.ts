import { selector } from "recoil";
import {userCurrentPasswordConfirmationErrorState} from "../../../../../atoms/users/edit/simple/passwordConfirmation/passwordConfirmationError";

export const userCurrentPasswordConfirmationErrorValueState = selector({
    key: "userCurrentPasswordConfirmationErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentPasswordConfirmationErrorState);
        return error;
    }
});

