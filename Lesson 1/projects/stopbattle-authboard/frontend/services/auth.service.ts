import axios from 'axios';
import LoginModelResponse from "../models/responses/auth/login.model";
import LoginModelRequest from "../models/requests/auth/login.model";
import RefreshModelRequest from "../models/requests/auth/refresh.model";
import RefreshModelResponse from "../models/responses/auth/refresh.model";
import IsTokenActiveModelRequest from "../models/requests/auth/isTokenActive.model";
import IsTokenActiveModelResponse from "../models/responses/auth/isTokenActive.model";
import IsSessionActiveModelResponse from "../models/responses/auth/isSessionActive.model";
import LogoutModelResponse from "../models/responses/auth/logout.model";
import GenerateTOTPModelResponse from "../models/responses/auth/generateTOTP.model";
import InstallTOTPModelRequest from "../models/requests/auth/installTOTP.model";
import InstallTOTPModelResponse from "../models/responses/auth/installTOTP.model";

class AuthService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async login(request: LoginModelRequest): Promise<LoginModelResponse> {
        let formatted = new LoginModelRequest();
        formatted.username = request.username;
        formatted.password = request.password;
        formatted.rememberMe = request.rememberMe;
        if(request.code && request.code.length > 0) {
            formatted.code = request.code;
        }
        return await this.axios_instance.post('api/auth/login', formatted)
            .then((res) => {
                let response = new LoginModelResponse();
                response.generated = res.data.isGenerated;
                response.token = res.data.token;
                response.error = res.data.error;
                response.success = true;
                response.authenticatorNeeded = res.data.isAuthenticatorNeeded;
                return response;
            })
            .catch((error) => {
                let response = new LoginModelResponse();
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
                        response.authenticatorNeeded = error.response.data.isAuthenticatorNeeded;
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

    async refresh(request: RefreshModelRequest): Promise<RefreshModelResponse> {
        return await this.axios_instance.post('api/auth/refresh', request)
            .then((res) => {
                let response = new RefreshModelResponse();
                response.generated = res.data.isGenerated;
                response.success = true;
                response.token = res.data.token;
                return response;
            })
            .catch((error) => {
                let response = new RefreshModelResponse();
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

    async isRefreshTokenActive(request: IsTokenActiveModelRequest): Promise<IsTokenActiveModelResponse> {
        return await this.axios_instance.post('api/auth/refresh/active', request)
            .then((res) => {
                let response = new IsTokenActiveModelResponse();
                response.success = true;
                response.active = res.data.isActive;
                response.exists = res.data.isExists;
                response.expiresAt = res.data.expiresAt;
                response.issuedAt = res.data.issuedAt;
                return response;
            })
            .catch((error) => {
                let response = new IsTokenActiveModelResponse();
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

    async isSessionActive(token: string): Promise<IsSessionActiveModelResponse> {
        return await this.axios_instance.get('api/auth/session/active', {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new IsSessionActiveModelResponse();
                response.success = true;
                response.active = res.data.isActive;
                response.sessionEnd = res.data.sessionEnd;
                response.sessionStart = res.data.sessionStart;
                return response;
            })
            .catch((error) => {
                let response = new IsSessionActiveModelResponse();
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

    async generateTOTP(token: string): Promise<GenerateTOTPModelResponse> {
        return await this.axios_instance.get('api/auth/2fa/generate', {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GenerateTOTPModelResponse();
                response.success = true;
                response.generated = res.data.isGenerated;
                response.error = res.data.error;
                response.key = res.data.key;
                response.qrCode = res.data.qrCode;
                return response;
            })
            .catch((error) => {
                let response = new GenerateTOTPModelResponse();
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

    async installTOTP(request: InstallTOTPModelRequest, token: string): Promise<InstallTOTPModelResponse> {
        return await this.axios_instance.post('api/auth/2fa/install', request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new InstallTOTPModelResponse();
                response.success = true;
                response.installed = res.data.isInstalled;
                response.error = res.data.error;
                return response;
            })
            .catch((error) => {
                let response = new InstallTOTPModelResponse();
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

    async logout(token: string): Promise<LogoutModelResponse> {
        return await this.axios_instance.get('api/auth/logout', {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new LogoutModelResponse();
                response.success = true;
                response.loggedOut = res.data.isLoggedOut;
                return response;
            })
            .catch((error) => {
                let response = new LogoutModelResponse();
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

export default new AuthService();

