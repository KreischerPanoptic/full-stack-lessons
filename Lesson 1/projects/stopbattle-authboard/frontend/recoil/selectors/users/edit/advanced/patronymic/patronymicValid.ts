import { selector } from "recoil";
import {userCurrentPatronymicValidState} from "../../../../../atoms/users/edit/advanced/patronymic/patronymicValid";

export const userCurrentPatronymicValidValueState = selector({
    key: "userCurrentPatronymicValidValueState",
    get: ({ get }) => {
        const valid = get(userCurrentPatronymicValidState);
        return valid;
    }
});

