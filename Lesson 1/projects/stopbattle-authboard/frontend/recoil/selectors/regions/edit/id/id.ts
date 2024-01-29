import { selector } from "recoil";
import {regionCurrentIdState} from "../../../../atoms/regions/edit/id/id";

export const regionCurrentIdValueState = selector({
    key: "regionCurrentIdValueState",
    get: ({ get }) => {
        const current = get(regionCurrentIdState);
        return current;
    }
});

