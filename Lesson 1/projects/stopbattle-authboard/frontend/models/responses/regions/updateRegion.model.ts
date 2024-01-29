import RegionModelResponse from "./region.model";

export default class UpdateRegionModelResponse {
    updated: boolean | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
    region: RegionModelResponse | undefined | null;
}
