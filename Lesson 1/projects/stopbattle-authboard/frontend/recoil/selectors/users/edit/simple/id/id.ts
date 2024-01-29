import { selector } from "recoil";
import {userCurrentIdState} from "../../../../../atoms/users/edit/simple/id/id";

export const userCurrentIdValueState = selector({
    key: "userCurrentIdValueState",
    get: ({ get }) => {
        const current = get(userCurrentIdState);
        return current;
    }
});

