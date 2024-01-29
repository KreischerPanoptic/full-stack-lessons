import { selector } from "recoil";
import {regionsAmountState} from "../../../../atoms/regions/table/amount/amount";

export const regionsAmountValueState = selector({
    key: "regionsAmountValueState",
    get: ({ get }) => {
        const amount = get(regionsAmountState);
        return amount;
    }
});

