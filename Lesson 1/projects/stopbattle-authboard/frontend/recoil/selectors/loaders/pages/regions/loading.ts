import { selector } from "recoil";
import {regionsLoadingState} from "../../../../atoms/loaders/pages/regions/loading";

export const isRegionsLoadingState = selector({
    key: "isRegionsLoadingState",
    get: ({ get }) => {
        const isLoading: boolean = get(regionsLoadingState);
        return isLoading;
    }
});
