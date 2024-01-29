import { selector } from "recoil";
import {profileCurrentPositionState} from "../../../../atoms/profile/edit/position/position";

export const profileCurrentPositionValueState = selector({
    key: "profileCurrentPositionValueState",
    get: ({ get }) => {
        const username = get(profileCurrentPositionState);
        return username;
    }
});

