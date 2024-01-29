import { atom } from "recoil";
import RegionItemModel from "../../../../../models/views/regions/regionItem.model";

export const regionsRowsState = atom<RegionItemModel[]>({
    key: "regionsRowsState",
    default: [],
});
