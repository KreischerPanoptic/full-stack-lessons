import { selector } from "recoil";
import {userCurrentPasswordErrorState} from "../../../../../atoms/users/edit/simple/password/passwordError";

export const userCurrentPasswordErrorValueState = selector({
    key: "userCurrentPasswordErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentPasswordErrorState);
        return error;
    }
});

