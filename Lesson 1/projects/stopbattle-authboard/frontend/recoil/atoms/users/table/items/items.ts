import { atom } from "recoil";
import UserModelResponse from "../../../../../models/responses/users/user.model";

export const usersItemsState = atom<UserModelResponse[]>({
    key: "usersItemsState",
    default: [],
});
