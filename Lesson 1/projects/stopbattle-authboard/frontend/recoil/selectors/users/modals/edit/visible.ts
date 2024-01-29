import { selector } from "recoil";
import {usersEditModalVisibleState} from "../../../../atoms/users/modals/edit/visible";

export const usersEditModalVisibleValueState = selector({
    key: "usersEditModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersEditModalVisibleState);
        return visible;
    }
});

