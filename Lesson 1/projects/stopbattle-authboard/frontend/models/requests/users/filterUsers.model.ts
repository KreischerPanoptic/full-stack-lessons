import FilterParamsModel from "./filterParams.model";

export default class FilterUsersModelRequest {
    active: boolean = true;
    archived: boolean = false;
    page: number = 1;
    amount: number = -1;
    params: FilterParamsModel = new FilterParamsModel();
}
