import { selector } from "recoil";
import {profileCurrentIdState} from "../../../../atoms/profile/edit/id/id";

export const profileCurrentIdValueState = selector({
    key: "profileCurrentIdValueState",
    get: ({ get }) => {
        const current = get(profileCurrentIdState);
        return current;
    }
});

