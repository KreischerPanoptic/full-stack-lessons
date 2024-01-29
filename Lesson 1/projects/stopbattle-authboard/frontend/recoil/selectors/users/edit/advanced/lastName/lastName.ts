import { selector } from "recoil";
import {userCurrentLastNameState} from "../../../../../atoms/users/edit/advanced/lastName/lastName";

export const userCurrentLastNameValueState = selector({
    key: "userCurrentLastNameValueState",
    get: ({ get }) => {
        const username = get(userCurrentLastNameState);
        return username;
    }
});

