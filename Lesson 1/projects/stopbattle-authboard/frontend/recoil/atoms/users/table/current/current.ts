import { atom } from "recoil";
import UserModelResponse from "../../../../../models/responses/users/user.model";

export const usersCurrentState = atom<UserModelResponse | undefined | null>({
    key: "usersCurrentState",
    default: undefined,
});
