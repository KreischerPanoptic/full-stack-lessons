import { selector } from "recoil";
import {userCurrentRankValidState} from "../../../../../atoms/users/edit/advanced/rank/rankValid";

export const userCurrentRankValidValueState = selector({
    key: "userCurrentRankValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentRankValidState);
        return valid;
    }
});

