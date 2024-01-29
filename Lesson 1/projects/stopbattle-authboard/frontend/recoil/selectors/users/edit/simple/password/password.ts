import { selector } from "recoil";
import {userCurrentPasswordState} from "../../../../../atoms/users/edit/simple/password/password";

export const userCurrentPasswordValueState = selector({
    key: "userCurrentPasswordValueState",
    get: ({ get }) => {
        const password = get(userCurrentPasswordState);
        return password;
    }
});
