import { selector } from "recoil";
import {profileCurrentPatronymicValidState} from "../../../../atoms/profile/edit/patronymic/patronymicValid";

export const profileCurrentPatronymicValidValueState = selector({
    key: "profileCurrentPatronymicValidValueState",
    get: ({ get }) => {
        const valid = get(profileCurrentPatronymicValidState);
        return valid;
    }
});

