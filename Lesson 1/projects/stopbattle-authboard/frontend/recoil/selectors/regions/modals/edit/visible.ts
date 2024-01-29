import { selector } from "recoil";
import {regionsEditModalVisibleState} from "../../../../atoms/regions/modals/edit/visible";

export const regionsEditModalVisibleValueState = selector({
    key: "regionsEditModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(regionsEditModalVisibleState);
        return visible;
    }
});

