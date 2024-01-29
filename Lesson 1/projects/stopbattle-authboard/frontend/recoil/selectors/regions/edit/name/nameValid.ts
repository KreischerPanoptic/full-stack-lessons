import { selector } from "recoil";
import {regionCurrentNameValidState} from "../../../../atoms/regions/edit/name/nameValid";

export const regionCurrentNameValidValueState = selector({
    key: "regionCurrentNameValidValueState",
    get: ({ get }) => {
        const valid = get(regionCurrentNameValidState);
        return valid;
    }
});

