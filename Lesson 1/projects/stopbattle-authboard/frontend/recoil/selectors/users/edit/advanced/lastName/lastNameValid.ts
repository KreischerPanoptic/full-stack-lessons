import { selector } from "recoil";
import {userCurrentLastNameValidState} from "../../../../../atoms/users/edit/advanced/lastName/lastNameValid";

export const userCurrentLastNameValidValueState = selector({
    key: "userCurrentLastNameValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentLastNameValidState);
        return valid;
    }
});

