import { selector } from "recoil";
import {regionsCurrentState} from "../../../../atoms/regions/table/current/current";

export const regionsCurrentValueState = selector({
    key: "regionsCurrentValueState",
    get: ({ get }) => {
        const current = get(regionsCurrentState);
        return current;
    }
});

