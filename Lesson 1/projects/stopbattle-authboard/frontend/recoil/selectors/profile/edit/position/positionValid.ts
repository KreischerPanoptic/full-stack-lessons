import { selector } from "recoil";
import {profileCurrentPositionValidState} from "../../../../atoms/profile/edit/position/positionValid";

export const profileCurrentPositionValidValueState = selector({
    key: "profileCurrentPositionValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentPositionValidState);
        return valid;
    }
});

