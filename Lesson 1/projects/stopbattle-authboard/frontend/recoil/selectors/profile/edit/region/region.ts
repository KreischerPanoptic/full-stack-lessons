import { selector } from "recoil";
import {profileCurrentRegionSelectedState} from "../../../../atoms/profile/edit/region/region";

export const profileCurrentRegionSelectedValueState = selector({
    key: "profileCurrentRegionSelectedValueState",
    get: ({ get }) => {
        const region = get(profileCurrentRegionSelectedState);
        return region;
    }
});
