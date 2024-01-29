import { selector } from "recoil";
import {profileCurrentRankState} from "../../../../atoms/profile/edit/rank/rank";

export const profileCurrentRankValueState = selector({
    key: "profileCurrentRankValueState",
    get: ({ get }) => {
        const username = get(profileCurrentRankState);
        return username;
    }
});

