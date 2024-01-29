import { selector } from "recoil";
import {profileCurrentRankErrorState} from "../../../../atoms/profile/edit/rank/rankError";

export const profileCurrentRankErrorValueState = selector({
    key: "profileCurrentRankErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentRankErrorState);
        return error;
    }
});

