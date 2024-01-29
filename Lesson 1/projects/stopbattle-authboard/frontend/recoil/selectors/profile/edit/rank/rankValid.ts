import { selector } from "recoil";
import {profileCurrentRankValidState} from "../../../../atoms/profile/edit/rank/rankValid";

export const profileCurrentRankValidValueState = selector({
    key: "profileCurrentRankValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentRankValidState);
        return valid;
    }
});

