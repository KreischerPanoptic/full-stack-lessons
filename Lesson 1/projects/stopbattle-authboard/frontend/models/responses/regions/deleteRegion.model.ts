import RegionModelResponse from "./region.model";

export default class DeleteRegionModelResponse {
    deleted: boolean | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
    region: RegionModelResponse | undefined | null;
}
