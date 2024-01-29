import { selector } from "recoil";
import {usersResetTOTPModalVisibleState} from "../../../../../atoms/users/modals/totp/reset/visible";

export const usersResetTOTPModalVisibleValueState = selector({
    key: "usersResetTOTPModalVisibleValueState",
    get: ({ get }) => {
        const visible = get(usersResetTOTPModalVisibleState);
        return visible;
    }
});

