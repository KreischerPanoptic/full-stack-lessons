import RegionModelResponse from "./region.model";

export default class CreateRegionModelResponse {
    created: boolean | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
    region: RegionModelResponse | undefined | null;
}
