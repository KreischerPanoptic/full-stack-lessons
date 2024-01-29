import { selector } from "recoil";
import {usersFilterArchivedState} from "../../../../atoms/users/filter/archived/archived";

export const usersFilterArchivedValueState = selector({
    key: "usersFilterArchivedValueState",
    get: ({ get }) => {
        const archived = get(usersFilterArchivedState);
        return archived;
    }
});

