import { selector } from "recoil";
import {profileCurrentPatronymicState} from "../../../../atoms/profile/edit/patronymic/patronymic";

export const profileCurrentPatronymicValueState = selector({
    key: "profileCurrentPatronymicValueState",
    get: ({ get }) => {
        const username = get(profileCurrentPatronymicState);
        return username;
    }
});

