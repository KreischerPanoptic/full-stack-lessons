import { selector } from "recoil";
import {userCurrentPatronymicErrorState} from "../../../../../atoms/users/edit/advanced/patronymic/patronymicError";

export const userCurrentPatronymicErrorValueState = selector({
    key: "userCurrentPatronymicErrorValueState",
    get: ({ get }) => {
        const error = get(userCurrentPatronymicErrorState);
        return error;
    }
});

