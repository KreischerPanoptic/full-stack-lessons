import { selector } from "recoil";
import {userCurrentPasswordConfirmationState} from "../../../../../atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";

export const userCurrentPasswordConfirmationValueState = selector({
    key: "userCurrentPasswordConfirmationValueState",
    get: ({ get }) => {
        const password = get(userCurrentPasswordConfirmationState);
        return password;
    }
});
