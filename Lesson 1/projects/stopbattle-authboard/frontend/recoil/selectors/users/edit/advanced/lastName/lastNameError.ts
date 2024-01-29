import { selector } from "recoil";
import {userCurrentLastNameErrorState} from "../../../../../atoms/users/edit/advanced/lastName/lastNameError";

export const userCurrentLastNameErrorValueState = selector({
    key: "userCurrentLastNameErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentLastNameErrorState);
        return error;
    }
});

