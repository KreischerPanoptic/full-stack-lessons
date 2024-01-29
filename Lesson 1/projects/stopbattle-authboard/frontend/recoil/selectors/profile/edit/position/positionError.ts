import { selector } from "recoil";
import {profileCurrentPositionErrorState} from "../../../../atoms/profile/edit/position/positionError";

export const profileCurrentPositionErrorValueState = selector({
    key: "profileCurrentPositionErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentPositionErrorState);
        return error;
    }
});

