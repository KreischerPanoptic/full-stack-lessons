import { selector } from "recoil";
import {profileCurrentPatronymicErrorState} from "../../../../atoms/profile/edit/patronymic/patronymicError";

export const profileCurrentPatronymicErrorValueState = selector({
    key: "profileCurrentPatronymicErrorValueState",
    get: ({ get }) => {
        const error = get(profileCurrentPatronymicErrorState);
        return error;
    }
});

