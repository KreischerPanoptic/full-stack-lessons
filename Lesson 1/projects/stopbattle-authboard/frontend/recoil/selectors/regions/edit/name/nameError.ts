import { selector } from "recoil";
import {regionCurrentNameErrorState} from "../../../../atoms/regions/edit/name/nameError";

export const regionCurrentNameErrorValueState = selector({
    key: "regionCurrentNameErrorValueState",
    get: ({ get }) => {
        const error = get(regionCurrentNameErrorState);
        return error;
    }
});

