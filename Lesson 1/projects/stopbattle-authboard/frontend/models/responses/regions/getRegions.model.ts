import RegionModelResponse from "./region.model";

export default class GetRegionsModelResponse {
    error: string | undefined | null;
    success: boolean = false;
    count: number = 0;
    page: number = 1;
    amount: number = -1;
    regions: RegionModelResponse[] = [];
}
