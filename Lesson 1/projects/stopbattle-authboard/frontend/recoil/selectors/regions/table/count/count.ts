import { selector } from "recoil";
import {regionsCountState} from "../../../../atoms/regions/table/count/count";

export const regionsCountValueState = selector({
    key: "regionsCountValueState",
    get: ({ get }) => {
        const count = get(regionsCountState);
        return count;
    }
});

