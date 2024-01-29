import { selector } from "recoil";
import {regionCurrentNameState} from "../../../../atoms/regions/edit/name/name";

export const regionCurrentNameValueState = selector({
    key: "regionCurrentNameValueState",
    get: ({ get }) => {
        const username = get(regionCurrentNameState);
        return username;
    }
});

