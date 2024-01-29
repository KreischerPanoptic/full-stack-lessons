import { atom } from "recoil";
import UserItemModel from "../../../../../models/views/users/userItem.model";

export const usersRowsState = atom<UserItemModel[]>({
    key: "usersRowsState",
    default: [],
});
