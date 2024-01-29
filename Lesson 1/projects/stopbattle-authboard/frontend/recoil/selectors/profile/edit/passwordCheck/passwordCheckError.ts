import { selector } from "recoil";
import {profileCurrentPasswordCheckErrorState} from "../../../../atoms/profile/edit/passwordCheck/passwordCheckError";

export const profileCurrentPasswordCheckErrorValueState = selector({
    key: "profileCurrentPasswordCheckErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentPasswordCheckErrorState);
        return error;
    }
});

