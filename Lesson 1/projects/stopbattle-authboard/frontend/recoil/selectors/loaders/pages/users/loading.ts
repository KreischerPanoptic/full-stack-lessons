import { selector } from "recoil";
import {usersLoadingState} from "../../../../atoms/loaders/pages/users/loading";

export const isUsersLoadingState = selector({
    key: "isUsersLoadingState",
    get: ({ get }) => {
        const isLoading: boolean = get(usersLoadingState);
        return isLoading;
    }
});
