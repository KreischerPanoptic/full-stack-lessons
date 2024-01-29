import { selector } from "recoil";
import {regionsFilterActiveState} from "../../../../atoms/regions/filter/active/active";

export const regionsFilterActiveValueState = selector({
    key: "regionsFilterActiveValueState",
    get: ({ get }) => {
        const active = get(regionsFilterActiveState);
        return active;
    }
});

