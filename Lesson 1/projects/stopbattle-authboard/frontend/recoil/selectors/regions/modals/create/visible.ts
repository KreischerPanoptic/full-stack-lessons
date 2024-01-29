import { selector } from "recoil";
import {regionsCreateModalVisibleState} from "../../../../atoms/regions/modals/create/visible";

export const regionsCreateModalVisibleValueState = selector({
    key: "regionsCreateModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(regionsCreateModalVisibleState);
        return visible;
    }
});

