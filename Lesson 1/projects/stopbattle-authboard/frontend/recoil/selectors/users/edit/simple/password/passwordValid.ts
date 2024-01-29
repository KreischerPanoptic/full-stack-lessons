import { selector } from "recoil";
import {userCurrentPasswordValidState} from "../../../../../atoms/users/edit/simple/password/passwordValid";

export const userCurrentPasswordValidValueState = selector({
    key: "userCurrentPasswordValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentPasswordValidState);
        return valid;
    }
});

