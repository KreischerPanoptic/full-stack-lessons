import { selector } from "recoil";
import { passwordState } from "../../atoms/login/password";

export const passwordValueState = selector({
    key: "passwordValueState",
    get: ({ get }) => {
        const password = get(passwordState);
        return password;
    }
});
