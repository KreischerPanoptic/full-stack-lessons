import { selector } from "recoil";
import {profileCurrentPasswordCheckState} from "../../../../atoms/profile/edit/passwordCheck/passwordCheck";

export const profileCurrentPasswordCheckValueState = selector({
    key: "profileCurrentPasswordCheckValueState",
    get: ({ get }) => {
        const password = get(profileCurrentPasswordCheckState);
        return password;
    }
});
