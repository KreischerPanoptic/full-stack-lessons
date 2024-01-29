import { selector } from "recoil";
import {usersCountValueState} from "../count/count";
import {usersAmountValueState} from "../amount/amount";

export const usersAllPagesValueState = selector({
    key: "usersAllPagesValueState",
    get: ({ get }) => {
        const count = get(usersCountValueState);
        const amount = get(usersAmountValueState);

        if(count <= 0 || amount <= 0) {
            return 0;
        }

        const addOne = count%amount !== 0;
        let pages = count/amount;
        if(addOne) {
            pages++;
        }
        return Math.trunc(pages);
    }
});

