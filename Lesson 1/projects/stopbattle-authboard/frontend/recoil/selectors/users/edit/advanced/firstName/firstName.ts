import { selector } from "recoil";
import {userCurrentFirstNameState} from "../../../../../atoms/users/edit/advanced/firstName/firstName";

export const userCurrentFirstNameValueState = selector({
    key: "userCurrentFirstNameValueState",
    get: ({ get }) => {
        const username = get(userCurrentFirstNameState);
        return username;
    }
});

