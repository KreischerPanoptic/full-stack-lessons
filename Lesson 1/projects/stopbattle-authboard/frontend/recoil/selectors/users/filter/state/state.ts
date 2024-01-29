import { selector } from "recoil";
import {usersFilterActiveValueState} from "../active/active";
import {usersFilterArchivedValueState} from "../archived/archived";

export const usersFilterStateValueState = selector<'Всі'|'Активні'|'Видалені'>({
    key: "usersFilterStateValueState",
    get: ({ get }) => {
        const active = get(usersFilterActiveValueState);
        const archived = get(usersFilterArchivedValueState);
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

