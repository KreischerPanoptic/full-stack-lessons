import { selector } from "recoil";
import {userCurrentFirstNameErrorState} from "../../../../../atoms/users/edit/advanced/firstName/firstNameError";

export const userCurrentFirstNameErrorValueState = selector({
    key: "userCurrentFirstNameErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentFirstNameErrorState);
        return error;
    }
});

