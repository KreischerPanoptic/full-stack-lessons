import { selector } from "recoil";
import { networkErrorState } from "../../../atoms/shared/error/error";

export const isNetworkErrorState = selector({
    key: "isNetworkErrorState",
    get: ({ get }) => {
        const error = get(networkErrorState);
        const isError: boolean = error ? error.length > 0 : false;
        return isError;
    }
});
