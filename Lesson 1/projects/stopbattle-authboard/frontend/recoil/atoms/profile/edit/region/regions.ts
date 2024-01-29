import { atom } from "recoil";
import RegionModelResponse from "../../../../../models/responses/regions/region.model";

export const profileCurrentRegionsOptionsState = atom<RegionModelResponse[]>({
    key: "profileCurrentRegionsOptionsState",
    default: []
});
