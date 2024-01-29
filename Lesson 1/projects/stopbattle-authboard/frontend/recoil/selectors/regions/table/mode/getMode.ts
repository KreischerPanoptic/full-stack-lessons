import { selector } from "recoil";
import {regionsGetModeState} from "../../../../atoms/regions/table/mode/getMode";

export const regionsGetModeValueState = selector({
    key: "regionsGetModeValueState",
    get: ({ get }) => {
        const mode = get(regionsGetModeState);
        return mode;
    }
});

