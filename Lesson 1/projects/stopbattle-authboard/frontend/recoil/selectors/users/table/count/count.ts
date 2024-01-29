import { selector } from "recoil";
import {usersCountState} from "../../../../atoms/users/table/count/count";

export const usersCountValueState = selector({
    key: "usersCountValueState",
    get: ({ get }) => {
        const count = get(usersCountState);
        return count;
    }
});

