import { selector } from "recoil";
import {userCurrentUsernameValidState} from "../../../../../atoms/users/edit/simple/username/usernameValid";

export const userCurrentUsernameValidValueState = selector({
    key: "userCurrentUsernameValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentUsernameValidState);
        return valid;
    }
});

