import { selector } from "recoil";
import {userCurrentPasswordCheckValidState} from "../../../../../atoms/users/edit/simple/passwordCheck/passwordCheckValid";

export const userCurrentPasswordCheckValidValueState = selector({
    key: "userCurrentPasswordCheckValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentPasswordCheckValidState);
        return valid;
    }
});

