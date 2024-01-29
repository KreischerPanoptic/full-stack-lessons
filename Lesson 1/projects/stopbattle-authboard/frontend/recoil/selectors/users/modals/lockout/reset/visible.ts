import { selector } from "recoil";
import {usersResetLockoutModalVisibleState} from "../../../../../atoms/users/modals/lockout/reset/visible";

export const usersResetLockoutModalVisibleValueState = selector({
    key: "usersResetLockoutModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersResetLockoutModalVisibleState);
        return visible;
    }
});

