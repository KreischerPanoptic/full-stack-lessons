import { atom } from "recoil";
import RegionModelResponse from "../../../../../../models/responses/regions/region.model";

export const usersCurrentRegionsOptionsState = atom<RegionModelResponse[]>({
    key: "usersCurrentRegionsOptionsState",
    default: []
});
