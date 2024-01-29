import { selector } from "recoil";
import {userCurrentPasswordCheckErrorState} from "../../../../../atoms/users/edit/simple/passwordCheck/passwordCheckError";

export const userCurrentPasswordCheckErrorValueState = selector({
    key: "userCurrentPasswordCheckErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentPasswordCheckErrorState);
        return error;
    }
});

