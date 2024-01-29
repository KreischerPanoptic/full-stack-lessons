import { selector } from "recoil";
import {usersCurrentRegionSelectedState} from "../../../../../atoms/users/edit/simple/region/region";

export const usersCurrentRegionSelectedValidValueState = selector({
    key: "usersCurrentRegionSelectedValidValueState",
    get: ({ get }) => {
        const region = get(usersCurrentRegionSelectedState);
        let valid = region && region > 1;
        return valid;
    }
});

