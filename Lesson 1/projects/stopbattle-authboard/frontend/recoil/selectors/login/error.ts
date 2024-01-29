import { selector } from "recoil";
import { loginErrorState } from "../../atoms/login/error";

export const loginErrorValueState = selector({
    key: "loginErrorValueState",
    get: ({ get }) => {
        const error = get(loginErrorState);
        return error;
    }
});
