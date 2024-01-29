import { selector } from "recoil";
import {userCurrentUsernameErrorState} from "../../../../../atoms/users/edit/simple/username/usernameError";

export const userCurrentUsernameErrorValueState = selector({
    key: "userCurrentUsernameErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentUsernameErrorState);
        return error;
    }
});

