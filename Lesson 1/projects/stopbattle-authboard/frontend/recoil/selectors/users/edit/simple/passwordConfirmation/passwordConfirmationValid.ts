import { selector } from "recoil";
import {userCurrentPasswordConfirmationValidState} from "../../../../../atoms/users/edit/simple/passwordConfirmation/passwordConfirmationValid";

export const userCurrentPasswordConfirmationValidValueState = selector({
    key: "userCurrentPasswordConfirmationValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentPasswordConfirmationValidState);
        return valid;
    }
});

