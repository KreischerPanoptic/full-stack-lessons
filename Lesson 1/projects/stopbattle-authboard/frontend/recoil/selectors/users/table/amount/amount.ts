import { selector } from "recoil";
import {usersAmountState} from "../../../../atoms/users/table/amount/amount";

export const usersAmountValueState = selector({
    key: "usersAmountValueState",
    get: ({ get }) => {
        const amount = get(usersAmountState);
        return amount;
    }
});

