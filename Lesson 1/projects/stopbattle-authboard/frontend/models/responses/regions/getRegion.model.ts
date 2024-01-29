import RegionModelResponse from "./region.model";

export default class GetRegionModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    region: RegionModelResponse | undefined | null;
}
