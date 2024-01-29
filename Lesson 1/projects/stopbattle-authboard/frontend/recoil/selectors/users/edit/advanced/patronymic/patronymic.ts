import { selector } from "recoil";
import {userCurrentPatronymicState} from "../../../../../atoms/users/edit/advanced/patronymic/patronymic";

export const userCurrentPatronymicValueState = selector({
    key: "userCurrentPatronymicValueState",
    get: ({ get }) => {
        const username = get(userCurrentPatronymicState);
        return username;
    }
});

