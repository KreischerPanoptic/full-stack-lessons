import axios from 'axios';
import ValidationRegionExistsModelRequest from "../models/requests/validate/validationRegionExists.model";
import ValidationModelResponse from "../models/responses/validate/validation.model";
import ValidationRespectiveUsernameModelRequest from "../models/requests/validate/validationRespectiveUsername.model";
import ValidationUsernameModelRequest from "../models/requests/validate/validationUsername.model";
import ValidationPasswordModelRequest from "../models/requests/validate/validationPassword.model";
import ValidationUserExistsModelRequest from "../models/requests/validate/validationUserExists.model";

class ValidateService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async isUserExists(request: ValidationUserExistsModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.get(`api/validate/users/exists/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

    async isPasswordStrong(request: ValidationPasswordModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.post(`api/validate/users/password/is_strong`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

    async isPasswordSatisfyPolicy(request: ValidationPasswordModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.post(`api/validate/users/password/is_passing`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

    async isUsernameUnique(request: ValidationUsernameModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.post(`api/validate/users/unique/username`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

    async isRespectiveUsernameUnique(request: ValidationRespectiveUsernameModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.post(`api/validate/users/respective/unique/username`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

    async isRegionExists(request: ValidationRegionExistsModelRequest, token: string): Promise<ValidationModelResponse> {
        return await this.axios_instance.get(`api/validate/regions/exists/${request.id}?active=${request.active}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ValidationModelResponse();
                response.success = true;
                response.passed = res.data.isPassed;
                return response;
            })
            .catch((error) => {
                let response = new ValidationModelResponse();
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

export default new ValidateService();

