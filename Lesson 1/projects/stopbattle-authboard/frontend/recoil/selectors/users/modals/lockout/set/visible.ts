import { selector } from "recoil";
import {usersSetLockoutModalVisibleState} from "../../../../../atoms/users/modals/lockout/set/visible";

export const usersSetLockoutModalVisibleValueState = selector({
    key: "usersSetLockoutModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersSetLockoutModalVisibleState);
        return visible;
    }
});

