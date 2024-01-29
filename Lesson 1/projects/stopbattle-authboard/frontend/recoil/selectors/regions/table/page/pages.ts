import { selector } from "recoil";
import {regionsCountValueState} from "../count/count";
import {regionsAmountValueState} from "../amount/amount";

export const regionsAllPagesValueState = selector({
    key: "regionsAllPagesValueState",
    get: ({ get }) => {
        const count = get(regionsCountValueState);
        const amount = get(regionsAmountValueState);

        if(count <= 0 || amount <= 0) {
            return 0;
        }

        const addOne = count%amount !== 0;
        console.log('count: ', count);
        console.log('amount: ',amount);
        console.log('module: ', count%amount);
        console.log('Add One: ',addOne);
        let pages = count/amount;
        console.log('pages: ', pages);
        if(addOne) {
            console.log('add page');
            pages++;
        }
        console.log('pages result: ', Math.trunc(pages));
        return Math.trunc(pages);
    }
});

