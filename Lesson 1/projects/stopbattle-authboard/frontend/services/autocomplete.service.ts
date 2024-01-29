import axios from 'axios';
import GetHintsModelRequest from "../models/requests/autocomplete/getHints.model";
import GetHintsModelResponse from "../models/responses/autocomplete/getHints.model";

class AutocompleteService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async getUsernameHints(request: GetHintsModelRequest, token: string): Promise<GetHintsModelResponse> {
        return await this.axios_instance.get(`api/autocomplete/username/${request.query}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetHintsModelResponse();
                response.success = true;
                response.count = res.data.count;
                response.hints = res.data.hints;
                return response;
            })
            .catch((error) => {
                let response = new GetHintsModelResponse();
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

    async getLastNameHints(request: GetHintsModelRequest, token: string): Promise<GetHintsModelResponse> {
        return await this.axios_instance.get(`api/autocomplete/lastname/${request.query}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetHintsModelResponse();
                response.success = true;
                response.count = res.data.count;
                response.hints = res.data.hints;
                return response;
            })
            .catch((error) => {
                let response = new GetHintsModelResponse();
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

    async getFirstNameHints(request: GetHintsModelRequest, token: string): Promise<GetHintsModelResponse> {
        return await this.axios_instance.get(`api/autocomplete/firstname/${request.query}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetHintsModelResponse();
                response.success = true;
                response.count = res.data.count;
                response.hints = res.data.hints;
                return response;
            })
            .catch((error) => {
                let response = new GetHintsModelResponse();
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

    async getRegionHints(request: GetHintsModelRequest, token: string): Promise<GetHintsModelResponse> {
        return await this.axios_instance.get(`api/autocomplete/region/${request.query}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetHintsModelResponse();
                response.success = true;
                response.count = res.data.count;
                response.hints = res.data.hints;
                return response;
            })
            .catch((error) => {
                let response = new GetHintsModelResponse();
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

    async getRoleHints(request: GetHintsModelRequest, token: string): Promise<GetHintsModelResponse> {
        return await this.axios_instance.get(`api/autocomplete/role/${request.query}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetHintsModelResponse();
                response.success = true;
                response.count = res.data.count;
                response.hints = res.data.hints;
                return response;
            })
            .catch((error) => {
                let response = new GetHintsModelResponse();
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

export default new AutocompleteService();

