import { selector } from "recoil";
import {userCurrentPositionErrorState} from "../../../../../atoms/users/edit/advanced/position/positionError";

export const userCurrentPositionErrorValueState = selector({
    key: "userCurrentPositionErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentPositionErrorState);
        return error;
    }
});

