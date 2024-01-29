import { selector } from "recoil";
import {userCurrentPasswordCheckState} from "../../../../../atoms/users/edit/simple/passwordCheck/passwordCheck";

export const userCurrentPasswordCheckValueState = selector({
    key: "userCurrentPasswordCheckValueState",
    get: ({ get }) => {
        const password = get(userCurrentPasswordCheckState);
        return password;
    }
});
