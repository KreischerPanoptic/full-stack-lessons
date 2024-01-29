import { selector } from "recoil";
import {usersGetModeState} from "../../../../atoms/users/table/mode/getMode";

export const usersGetModeValueState = selector({
    key: "usersGetModeValueState",
    get: ({ get }) => {
        const mode = get(usersGetModeState);
        return mode;
    }
});

