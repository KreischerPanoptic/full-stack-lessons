import { selector } from "recoil";
import {profileCurrentFirstNameState} from "../../../../atoms/profile/edit/firstName/firstName";

export const profileCurrentFirstNameValueState = selector({
    key: "profileCurrentFirstNameValueState",
    get: ({ get }) => {
        const username = get(profileCurrentFirstNameState);
        return username;
    }
});

