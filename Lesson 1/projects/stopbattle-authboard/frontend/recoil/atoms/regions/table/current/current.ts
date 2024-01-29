import { atom } from "recoil";
import RegionModelResponse from "../../../../../models/responses/regions/region.model";

export const regionsCurrentState = atom<RegionModelResponse | undefined | null>({
    key: "regionsCurrentState",
    default: undefined,
});
