import { selector } from "recoil";
import {usersCurrentState} from "../../../../atoms/users/table/current/current";

export const usersCurrentValueState = selector({
    key: "usersCurrentValueState",
    get: ({ get }) => {
        const current = get(usersCurrentState);
        return current;
    }
});

