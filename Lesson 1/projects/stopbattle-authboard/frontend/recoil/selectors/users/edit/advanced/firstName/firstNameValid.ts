import { selector } from "recoil";
import {userCurrentFirstNameValidState} from "../../../../../atoms/users/edit/advanced/firstName/firstNameValid";

export const userCurrentFirstNameValidValueState = selector({
    key: "userCurrentFirstNameValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentFirstNameValidState);
        return valid;
    }
});

