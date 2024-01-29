import { selector } from "recoil";
import {profileCurrentLastNameErrorState} from "../../../../atoms/profile/edit/lastName/lastNameError";

export const profileCurrentLastNameErrorValueState = selector({
    key: "profileCurrentLastNameErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentLastNameErrorState);
        return error;
    }
});

