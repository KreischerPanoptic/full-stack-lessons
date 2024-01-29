import axios from 'axios';
import GetRegionsModelRequest from "../models/requests/regions/getRegions.model";
import GetRegionsModelResponse from "../models/responses/regions/getRegions.model";
import GetRegionModelResponse from "../models/responses/regions/getRegion.model";
import RegionModelResponse from "../models/responses/regions/region.model";
import RegionIdModelRequest from "../models/requests/regions/regionId.model";
import CreateUpdateRegionModelRequest from "../models/requests/regions/createUpdateRegion.model";
import CreateRegionModelResponse from "../models/responses/regions/createRegion.model";
import UpdateRegionModelResponse from "../models/responses/regions/updateRegion.model";
import DeleteRegionModelResponse from "../models/responses/regions/deleteRegion.model";

class RegionsService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async getRegions(request: GetRegionsModelRequest, token: string): Promise<GetRegionsModelResponse> {
        return await this.axios_instance.get(`api/regions?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetRegionsModelResponse();
                response.success = true;
                let regions: RegionModelResponse[] = [];
                for(let reg of res.data.regions) {
                    let region = new RegionModelResponse();
                    region.id = reg.id;
                    region.name = reg.name;
                    region.usersCount = reg.usersCount;
                    region.archived = reg.isArchived;
                    regions.push(region);
                }
                response.regions = regions;
                response.count = res.data.count;
                response.amount = res.data.amount;
                response.page = res.data.page;
                return response;
            })
            .catch((error) => {
                let response = new GetRegionsModelResponse();
                if (error.response) {
                    if(error.response.data) {
                        if(error.response.data.error) {
                            response.success = false;
                            response.error = error.response.data.error;
                        }
                        else {
                            response.success = false;
                            response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                        }
                    }
                    else {
                        response.success = false;
                        response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                    }
                } else {
                    response.success = false;
                    response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                }
                return response;
            });
    }

    async getRegion(request: RegionIdModelRequest, token: string): Promise<GetRegionModelResponse> {
        return await this.axios_instance.get(`api/regions/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetRegionModelResponse();
                response.success = true;

                let region = new RegionModelResponse();
                region.id = res.data.id;
                region.name = res.data.name;
                region.usersCount = res.data.usersCount;
                region.archived = res.data.isArchived;

                response.region = region;
                return response;
            })
            .catch((error) => {
                let response = new GetRegionModelResponse();
                if (error.response) {
                    if(error.response.data) {
                        if(error.response.data.error) {
                            response.success = false;
                            response.error = error.response.data.error;
                        }
                        else {
                            response.success = false;
                            response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                        }
                    }
                    else {
                        response.success = false;
                        response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                    }
                } else {
                    response.success = false;
                    response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                }
                return response;
            });
    }

    async createRegion(request: CreateUpdateRegionModelRequest, token: string): Promise<CreateRegionModelResponse> {
        return await this.axios_instance.post(`api/regions/create`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new CreateRegionModelResponse();
                response.success = true;
                response.error = res.data.error;
                response.created = res.data.isCreated;

                if(response.created) {
                    let region = new RegionModelResponse();
                    region.id = res.data.region.id;
                    region.name = res.data.region.name;
                    region.usersCount = res.data.usersCount;
                    region.archived = res.data.region.isArchived;

                    response.region = region;
                }
                return response;
            })
            .catch((error) => {
                let response = new CreateRegionModelResponse();
                if (error.response) {
                    if(error.response.data) {
                        if(error.response.data.error) {
                            response.success = false;
                            response.error = error.response.data.error;
                        }
                        else {
                            response.success = false;
                            response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                        }
                    }
                    else {
                        response.success = false;
                        response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                    }
                } else {
                    response.success = false;
                    response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                }
                return response;
            });
    }

    async updateRegion(id: RegionIdModelRequest, request: CreateUpdateRegionModelRequest, token: string): Promise<UpdateRegionModelResponse> {
        return await this.axios_instance.patch(`api/regions/update/${id.id}`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new UpdateRegionModelResponse();
                response.success = true;
                response.error = res.data.error;
                response.updated = res.data.isUpdated;

                if(response.updated) {
                    let region = new RegionModelResponse();
                    region.id = res.data.region.id;
                    region.name = res.data.region.name;
                    region.usersCount = res.data.usersCount;
                    region.archived = res.data.region.isArchived;

                    response.region = region;
                }
                return response;
            })
            .catch((error) => {
                let response = new UpdateRegionModelResponse();
                if (error.response) {
                    if(error.response.data) {
                        if(error.response.data.error) {
                            response.success = false;
                            response.error = error.response.data.error;
                        }
                        else {
                            response.success = false;
                            response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                        }
                    }
                    else {
                        response.success = false;
                        response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                    }
                } else {
                    response.success = false;
                    response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                }
                return response;
            });
    }

    async removeRegion(request: RegionIdModelRequest, token: string): Promise<DeleteRegionModelResponse> {
        return await this.axios_instance.delete(`api/regions/remove/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new DeleteRegionModelResponse();
                response.success = true;
                response.error = res.data.error;
                response.deleted = res.data.isDeleted;

                if(response.deleted) {
                    let region = new RegionModelResponse();
                    region.id = res.data.region.id;

                    response.region = region;
                }
                return response;
            })
            .catch((error) => {
                let response = new DeleteRegionModelResponse();
                if (error.response) {
                    if(error.response.data) {
                        if(error.response.data.error) {
                            response.success = false;
                            response.error = error.response.data.error;
                        }
                        else {
                            response.success = false;
                            response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                        }
                    }
                    else {
                        response.success = false;
                        response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                    }
                } else {
                    response.success = false;
                    response.error = error.message ? error.message : 'Не вдалося виконати запит до API';
                }
                return response;
            });
    }
}

export default new RegionsService();

