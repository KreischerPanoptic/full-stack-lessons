import { selector } from "recoil";
import {profileCurrentPasswordErrorState} from "../../../../atoms/profile/edit/password/passwordError";

export const profileCurrentPasswordErrorValueState = selector({
    key: "profileCurrentPasswordErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentPasswordErrorState);
        return error;
    }
});

