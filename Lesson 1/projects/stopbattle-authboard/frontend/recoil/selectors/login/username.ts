import { selector } from "recoil";
import { usernameState } from "../../atoms/login/username";

export const usernameValueState = selector({
    key: "usernameValueState",
    get: ({ get }) => {
        const username = get(usernameState);
        return username;
    }
});
