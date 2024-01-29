import { selector } from "recoil";
import {profileLoadingState} from "../../../../atoms/loaders/pages/profile/loading";

export const isProfileLoadingState = selector({
    key: "isProfileLoadingState",
    get: ({ get }) => {
        const isLoading: boolean = get(profileLoadingState);
        return isLoading;
    }
});
