import { selector } from "recoil";
import {regionsFilterActiveValueState} from "../active/active";
import {regionsFilterArchivedValueState} from "../archived/archived";

export const regionsFilterStateValueState = selector<'Всі'|'Активні'|'Видалені'>({
    key: "regionsFilterStateValueState",
    get: ({ get }) => {
        const active = get(regionsFilterActiveValueState);
        const archived = get(regionsFilterArchivedValueState);
        if(active && archived) {
            return 'Всі';
        }
        else if(active && !archived) {
            return 'Активні';
        }
        else if(!active && archived) {
            return 'Видалені';
        }
        return 'Активні'
    }
});

