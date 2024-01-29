import { selector } from "recoil";
import {userCurrentRankState} from "../../../../../atoms/users/edit/advanced/rank/rank";

export const userCurrentRankValueState = selector({
    key: "userCurrentRankValueState",
    get: ({ get }) => {
        const username = get(userCurrentRankState);
        return username;
    }
});

