import { selector } from "recoil";
import {profileCurrentFirstNameErrorState} from "../../../../atoms/profile/edit/firstName/firstNameError";

export const profileCurrentFirstNameErrorValueState = selector({
    key: "profileCurrentFirstNameErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentFirstNameErrorState);
        return error;
    }
});

