import { atom } from "recoil";
import RegionModelResponse from "../../../../../models/responses/regions/region.model";

export const profileCurrentRegionSelectedState = atom<RegionModelResponse | undefined>({
    key: "usersCurrentRegionSelectedState",
    default: undefined
});
