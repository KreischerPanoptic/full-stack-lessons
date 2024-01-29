import { selector } from "recoil";
import { loginLoadingState } from "../../../../atoms/loaders/pages/login/loading";

export const isLoginLoadingState = selector({
    key: "isLoginLoadingState",
    get: ({ get }) => {
        const isLoading: boolean = get(loginLoadingState);
        return isLoading;
    }
});
