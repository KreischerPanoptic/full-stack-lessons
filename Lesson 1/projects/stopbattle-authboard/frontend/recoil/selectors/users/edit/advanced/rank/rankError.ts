import { selector } from "recoil";
import {userCurrentRankErrorState} from "../../../../../atoms/users/edit/advanced/rank/rankError";

export const userCurrentRankErrorValueState = selector({
    key: "userCurrentRankErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentRankErrorState);
        return error;
    }
});

