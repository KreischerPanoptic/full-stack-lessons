import { selector } from "recoil";
import {userCurrentPositionState} from "../../../../../atoms/users/edit/advanced/position/position";

export const userCurrentPositionValueState = selector({
    key: "userCurrentPositionValueState",
    get: ({ get }) => {
        const username = get(userCurrentPositionState);
        return username;
    }
});

