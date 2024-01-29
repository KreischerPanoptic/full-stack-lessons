import { selector } from "recoil";
import {regionsFilterArchivedState} from "../../../../atoms/regions/filter/archived/archived";

export const regionsFilterArchivedValueState = selector({
    key: "regionsFilterArchivedValueState",
    get: ({ get }) => {
        const archived = get(regionsFilterArchivedState);
        return archived;
    }
});

