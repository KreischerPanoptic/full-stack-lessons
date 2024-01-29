import { selector } from "recoil";
import { networkErrorState } from "../../../atoms/shared/error/error";

export const networkErrorValueState = selector({
    key: "networkErrorValueState",
    get: ({ get }) => {
        const error = get(networkErrorState);
        return error;
    }
});
