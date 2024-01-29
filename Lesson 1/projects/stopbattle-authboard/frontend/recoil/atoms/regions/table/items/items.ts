import { atom } from "recoil";
import RegionModelResponse from "../../../../../models/responses/regions/region.model";

export const regionsItemsState = atom<RegionModelResponse[]>({
    key: "regionsItemsState",
    default: [],
});
