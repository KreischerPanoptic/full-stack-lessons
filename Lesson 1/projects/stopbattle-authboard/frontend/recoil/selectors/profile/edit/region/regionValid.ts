import { selector } from "recoil";
import {profileCurrentRegionSelectedState} from "../../../../atoms/profile/edit/region/region";

export const profileCurrentRegionSelectedValidValueState = selector({
    key: "profileCurrentRegionSelectedValidValueState",
    get: ({ get }) => {
        const region = get(profileCurrentRegionSelectedState);
        let valid = region && region.name.length > 0 && !region.archived && region.id > 1;
        return valid;
    }
});

