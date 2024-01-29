import { selector } from "recoil";
import {usersCurrentPageState} from "../../../../atoms/users/table/page/page";

export const usersCurrentPageValueState = selector({
    key: "usersCurrentPageValueState",
    get: ({ get }) => {
        const current = get(usersCurrentPageState);
        return current;
    }
});

