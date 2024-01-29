import { selector } from "recoil";
import {profileCurrentPasswordCheckValidState} from "../../../../atoms/profile/edit/passwordCheck/passwordCheckValid";

export const profileCurrentPasswordCheckValidValueState = selector({
    key: "profileCurrentPasswordCheckValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentPasswordCheckValidState);
        return valid;
    }
});

