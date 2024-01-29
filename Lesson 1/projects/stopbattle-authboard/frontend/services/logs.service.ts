import axios from 'axios';
import LogIdModelRequest from "../models/requests/logs/logId.model";
import GetLogModelResponse from "../models/responses/logs/getLog.model";
import GetLogsModelResponse from "../models/responses/logs/getLogs.model";
import GetLogsModelRequest from "../models/requests/logs/getLogs.model";
import FilterLogsModelRequest from "../models/requests/logs/filterLogs.model";
import LogModelResponse from "../models/responses/logs/log.model";
import UserModelResponse from "../models/responses/users/user.model";
import RegionModelResponse from "../models/responses/regions/region.model";

class LogsService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async getLogs(request: GetLogsModelRequest, token: string): Promise<GetLogsModelResponse> {
        return await this.axios_instance.get(`api/logs?page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetLogsModelResponse();
                response.success = true;
                let logs: LogModelResponse[] = [];
                for(let lg of res.data.logs) {
                    let log = new LogModelResponse();
                    log.id = lg.id;
                    log.subjectId = lg.subjectId;
                    if(lg.subjectId && lg.subject) {
                        log.subject = new UserModelResponse();
                        log.subject.id = lg.subject.id;
                        log.subject.username = lg.subject.username;
                        log.subject.firstName = lg.subject.firstName;
                        log.subject.lastName = lg.subject.lastName;
                        log.subject.patronymic = lg.subject.patronymic;
                        log.subject.position = lg.subject.position;
                        log.subject.rank = lg.subject.rank;
                        log.subject.regionId = lg.subject.regionId;
                        log.subject.region = lg.subject.region;
                        log.subject.enabled = lg.subject.isEnabled;
                        log.subject.totpEnabled = lg.subject.isTOTPEnabled;
                        log.subject.lockedOut = lg.subject.isLockedOut;
                        log.subject.role = lg.subject.role;
                    }
                    log.userId = lg.userId;
                    if(lg.userId && lg.user) {
                        log.user = new UserModelResponse();
                        log.user.id = lg.user.id;
                        log.user.username = lg.user.username;
                        log.user.firstName = lg.user.firstName;
                        log.user.lastName = lg.user.lastName;
                        log.user.patronymic = lg.user.patronymic;
                        log.user.position = lg.user.position;
                        log.user.rank = lg.user.rank;
                        log.user.regionId = lg.user.regionId;
                        log.user.region = lg.user.region;
                        log.user.enabled = lg.user.isEnabled;
                        log.user.totpEnabled = lg.user.isTOTPEnabled;
                        log.user.lockedOut = lg.user.isLockedOut;
                        log.user.role = lg.user.role;
                    }
                    log.regionId = lg.regionId;
                    if(lg.regionId && lg.region) {
                        log.region = new RegionModelResponse();
                        log.region.id = lg.region.id;
                        log.region.name = lg.region.name;
                        log.region.archived = lg.region.isArchived;
                    }
                    log.roleId = lg.roleId;
                    log.role = lg.role;
                    log.action = lg.action;
                    log.loggedAt = new Date(lg.loggedAt);
                    logs.push(log);
                }
                response.logs = logs;
                response.count = res.data.count;
                response.amount = res.data.amount;
                response.page = res.data.page;
                return response;
            })
            .catch((error) => {
                let response = new GetLogsModelResponse();
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

    async filterLogs(request: FilterLogsModelRequest, token: string): Promise<GetLogsModelResponse> {
        return await this.axios_instance.post(`api/logs/filter?page=${request.page}&amount=${request.amount}`, request.params, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetLogsModelResponse();
                response.success = true;
                let logs: LogModelResponse[] = [];
                for(let lg of res.data.logs) {
                    let log = new LogModelResponse();
                    log.id = lg.id;
                    log.subjectId = lg.subjectId;
                    if(lg.subjectId && lg.subject) {
                        log.subject = new UserModelResponse();
                        log.subject.id = lg.subject.id;
                        log.subject.username = lg.subject.username;
                        log.subject.firstName = lg.subject.firstName;
                        log.subject.lastName = lg.subject.lastName;
                        log.subject.patronymic = lg.subject.patronymic;
                        log.subject.position = lg.subject.position;
                        log.subject.rank = lg.subject.rank;
                        log.subject.regionId = lg.subject.regionId;
                        log.subject.region = lg.subject.region;
                        log.subject.enabled = lg.subject.isEnabled;
                        log.subject.totpEnabled = lg.subject.isTOTPEnabled;
                        log.subject.lockedOut = lg.subject.isLockedOut;
                        log.subject.role = lg.subject.role;
                    }
                    log.userId = lg.userId;
                    if(lg.userId && lg.user) {
                        log.user = new UserModelResponse();
                        log.user.id = lg.user.id;
                        log.user.username = lg.user.username;
                        log.user.firstName = lg.user.firstName;
                        log.user.lastName = lg.user.lastName;
                        log.user.patronymic = lg.user.patronymic;
                        log.user.position = lg.user.position;
                        log.user.rank = lg.user.rank;
                        log.user.regionId = lg.user.regionId;
                        log.user.region = lg.user.region;
                        log.user.enabled = lg.user.isEnabled;
                        log.user.totpEnabled = lg.user.isTOTPEnabled;
                        log.user.lockedOut = lg.user.isLockedOut;
                        log.user.role = lg.user.role;
                    }
                    log.regionId = lg.regionId;
                    if(lg.regionId && lg.region) {
                        log.region = new RegionModelResponse();
                        log.region.id = lg.region.id;
                        log.region.name = lg.region.name;
                        log.region.archived = lg.region.isArchived;
                    }
                    log.roleId = lg.roleId;
                    log.role = lg.role;
                    log.action = lg.action;
                    log.loggedAt = new Date(lg.loggedAt);
                    logs.push(log);
                }
                response.logs = logs;
                response.count = res.data.count;
                response.amount = res.data.amount;
                response.page = res.data.page;
                return response;
            })
            .catch((error) => {
                let response = new GetLogsModelResponse();
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

    async getLog(request: LogIdModelRequest, token: string): Promise<GetLogModelResponse> {
        return await this.axios_instance.get(`api/logs/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetLogModelResponse();
                response.success = true;

                let log = new LogModelResponse();
                log.id = res.data.id;
                log.subjectId = res.data.subjectId;
                if(res.data.subjectId && res.data.subject) {
                    log.subject = new UserModelResponse();
                    log.subject.id = res.data.subject.id;
                    log.subject.username = res.data.subject.username;
                    log.subject.firstName = res.data.subject.firstName;
                    log.subject.lastName = res.data.subject.lastName;
                    log.subject.patronymic = res.data.subject.patronymic;
                    log.subject.position = res.data.subject.position;
                    log.subject.rank = res.data.subject.rank;
                    log.subject.regionId = res.data.subject.regionId;
                    log.subject.region = res.data.subject.region;
                    log.subject.enabled = res.data.subject.isEnabled;
                    log.subject.totpEnabled = res.data.subject.isTOTPEnabled;
                    log.subject.lockedOut = res.data.subject.isLockedOut;
                    log.subject.role = res.data.subject.role;
                }
                log.userId = res.data.userId;
                if(res.data.userId && res.data.user) {
                    log.user = new UserModelResponse();
                    log.user.id = res.data.user.id;
                    log.user.username = res.data.user.username;
                    log.user.firstName = res.data.user.firstName;
                    log.user.lastName = res.data.user.lastName;
                    log.user.patronymic = res.data.user.patronymic;
                    log.user.position = res.data.user.position;
                    log.user.rank = res.data.user.rank;
                    log.user.regionId = res.data.user.regionId;
                    log.user.region = res.data.user.region;
                    log.user.enabled = res.data.user.isEnabled;
                    log.user.totpEnabled = res.data.user.isTOTPEnabled;
                    log.user.lockedOut = res.data.user.isLockedOut;
                    log.user.role = res.data.user.role;
                }
                log.regionId = res.data.regionId;
                if(res.data.regionId && res.data.region) {
                    log.region = new RegionModelResponse();
                    log.region.id = res.data.region.id;
                    log.region.name = res.data.region.name;
                    log.region.archived = res.data.region.isArchived;
                }
                log.roleId = res.data.roleId;
                log.role = res.data.role;
                log.action = res.data.action;
                log.loggedAt = new Date(res.data.loggedAt);
                response.log = log;
                return response;
            })
            .catch((error) => {
                let response = new GetLogModelResponse();
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

export default new LogsService();

