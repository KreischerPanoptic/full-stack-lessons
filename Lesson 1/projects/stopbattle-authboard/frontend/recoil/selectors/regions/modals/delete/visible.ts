import { selector } from "recoil";
import {regionsDeleteModalVisibleState} from "../../../../atoms/regions/modals/delete/visible";

export const regionsDeleteModalVisibleValueState = selector({
    key: "regionsDeleteModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(regionsDeleteModalVisibleState);
        return visible;
    }
});

