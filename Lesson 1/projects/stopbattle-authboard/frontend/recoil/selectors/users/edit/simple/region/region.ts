import { selector } from "recoil";
import {usersCurrentRegionSelectedState} from "../../../../../atoms/users/edit/simple/region/region";

export const usersCurrentRegionSelectedValueState = selector({
    key: "usersCurrentRegionSelectedValueState",
    get: ({ get }) => {
        const region = get(usersCurrentRegionSelectedState);
        return region;
    }
});
