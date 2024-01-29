import { selector } from "recoil";
import {usersCreateModalVisibleState} from "../../../../atoms/users/modals/create/visible";

export const usersCreateModalVisibleValueState = selector({
    key: "usersCreateModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersCreateModalVisibleState);
        return visible;
    }
});

