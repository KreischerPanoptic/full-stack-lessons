import { selector } from "recoil";
import {userCurrentUsernameState} from "../../../../../atoms/users/edit/simple/username/username";

export const userCurrentUsernameValueState = selector({
    key: "userCurrentUsernameValueState",
    get: ({ get }) => {
        const username = get(userCurrentUsernameState);
        return username;
    }
});

