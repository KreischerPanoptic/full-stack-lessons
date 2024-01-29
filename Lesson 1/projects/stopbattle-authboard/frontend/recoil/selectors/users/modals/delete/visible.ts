import { selector } from "recoil";
import {usersDeleteModalVisibleState} from "../../../../atoms/users/modals/delete/visible";

export const usersDeleteModalVisibleValueState = selector({
    key: "usersDeleteModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersDeleteModalVisibleState);
        return visible;
    }
});

