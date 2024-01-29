import { selector } from "recoil";
import { loginErrorState } from "../../atoms/login/error";

export const isLoginErrorState = selector({
    key: "isLoginErrorState",
    get: ({ get }) => {
        const error = get(loginErrorState);
        const isError: boolean = error ? error.length > 0 : false;
        return isError;
    }
});
