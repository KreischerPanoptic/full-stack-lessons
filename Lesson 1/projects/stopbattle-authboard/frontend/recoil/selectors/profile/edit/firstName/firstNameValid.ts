import { selector } from "recoil";
import {profileCurrentFirstNameValidState} from "../../../../atoms/profile/edit/firstName/firstNameValid";

export const profileCurrentFirstNameValidValueState = selector({
    key: "profileCurrentFirstNameValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentFirstNameValidState);
        return valid;
    }
});

