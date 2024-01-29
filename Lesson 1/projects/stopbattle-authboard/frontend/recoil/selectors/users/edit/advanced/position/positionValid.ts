import { selector } from "recoil";
import {userCurrentPositionValidState} from "../../../../../atoms/users/edit/advanced/position/positionValid";

export const userCurrentPositionValidValueState = selector({
    key: "userCurrentPositionValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentPositionValidState);
        return valid;
    }
});

