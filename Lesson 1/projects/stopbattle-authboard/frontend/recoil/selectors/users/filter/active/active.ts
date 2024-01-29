import { selector } from "recoil";
import {usersFilterActiveState} from "../../../../atoms/users/filter/active/active";

export const usersFilterActiveValueState = selector({
    key: "usersFilterActiveValueState",
    get: ({ get }) => {
        const active = get(usersFilterActiveState);
        return active;
    }
});

