import axios from 'axios';
import GetUsersModelRequest from "../models/requests/users/getUsers.model";
import GetUsersModelResponse from "../models/responses/users/getUsers.model";
import UserModelResponse from "../models/responses/users/user.model";
import UserIdModelRequest from "../models/requests/users/userId.model";
import GetUserModelResponse from "../models/responses/users/getUser.model";
import GetCurrentUserModelResponse from "../models/responses/users/getCurrentUser.model";
import GetUserRoleModelResponse from "../models/responses/users/getUserRole.model";
import CreateUserModelRequest from "../models/requests/users/createUser.model";
import CreateUserModelResponse from "../models/responses/users/createUser.model";
import UpdateUserModelRequest from "../models/requests/users/updateUser.model";
import UpdateUserModelResponse from "../models/responses/users/updateUser.model";
import EditUserModelRequest from "../models/requests/users/editUser.model";
import SetUserSecurityModelResponse from "../models/responses/users/setUserSecurity.model";
import ResetUserSecurityModelResponse from "../models/responses/users/resetUserSecurity.model";
import DeleteUserModelResponse from "../models/responses/users/deleteUser.model";
import FilterUsersModelRequest from "../models/requests/users/filterUsers.model";

class UsersService {
    private axios_instance = axios.create({
        baseURL: process.env.BACKEND_URL
    });

    async getUsers(request: GetUsersModelRequest, token: string): Promise<GetUsersModelResponse> {
        return await this.axios_instance.get(`api/users?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetUsersModelResponse();
                response.success = true;
                let users: UserModelResponse[] = [];
                for(let usr of res.data.users) {
                    let user = new UserModelResponse();
                    user.id = usr.id;
                    user.username = usr.username;
                    user.firstName = usr.firstName;
                    user.lastName = usr.lastName;
                    user.patronymic = usr.patronymic;
                    user.position = usr.position;
                    user.rank = usr.rank;
                    user.regionId = usr.regionId;
                    user.region = usr.region;
                    user.enabled = usr.isEnabled;
                    user.totpEnabled = usr.isTOTPEnabled;
                    user.lockedOut = usr.isLockedOut;
                    user.role = usr.role;
                    users.push(user);
                }
                response.users = users;
                response.count = res.data.count;
                response.amount = res.data.amount;
                response.page = res.data.page;
                return response;
            })
            .catch((error) => {
                let response = new GetUsersModelResponse();
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

    async filterUsers(request: FilterUsersModelRequest, token: string): Promise<GetUsersModelResponse> {
        return await this.axios_instance.post(`api/users/filter?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, request.params, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetUsersModelResponse();
                response.success = true;
                let users: UserModelResponse[] = [];
                for(let usr of res.data.users) {
                    let user = new UserModelResponse();
                    user.id = usr.id;
                    user.username = usr.username;
                    user.firstName = usr.firstName;
                    user.lastName = usr.lastName;
                    user.patronymic = usr.patronymic;
                    user.position = usr.position;
                    user.rank = usr.rank;
                    user.regionId = usr.regionId;
                    user.region = usr.region;
                    user.enabled = usr.isEnabled;
                    user.totpEnabled = usr.isTOTPEnabled;
                    user.lockedOut = usr.isLockedOut;
                    user.role = usr.role;
                    users.push(user);
                }
                response.users = users;
                response.count = res.data.count;
                response.amount = res.data.amount;
                response.page = res.data.page;
                return response;
            })
            .catch((error) => {
                let response = new GetUsersModelResponse();
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

    async getUser(request: UserIdModelRequest, token: string): Promise<GetUserModelResponse> {
        return await this.axios_instance.get(`api/users/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetUserModelResponse();
                response.success = true;

                let user = new UserModelResponse();
                user.id = res.data.id;
                user.username = res.data.username;
                user.firstName = res.data.firstName;
                user.lastName = res.data.lastName;
                user.patronymic = res.data.patronymic;
                user.position = res.data.position;
                user.rank = res.data.rank;
                user.regionId = res.data.regionId;
                user.region = res.data.region;
                user.enabled = res.data.isEnabled;
                user.totpEnabled = res.data.isTOTPEnabled;
                user.lockedOut = res.data.isLockedOut;
                user.role = res.data.role;

                response.user = user;
                return response;
            })
            .catch((error) => {
                let response = new GetUserModelResponse();
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

    async getCurrentUser(token: string): Promise<GetCurrentUserModelResponse> {
        return await this.axios_instance.get(`api/users/current`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetCurrentUserModelResponse();
                response.success = true;
                response.loggedIn = res.data.isLoggedIn;

                if(response.loggedIn && res.data.user.id) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }
                return response;
            })
            .catch((error) => {
                let response = new GetCurrentUserModelResponse();
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

    async getUserRole(token: string): Promise<GetUserRoleModelResponse> {
        return await this.axios_instance.get(`api/users/current/is_admin`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new GetUserRoleModelResponse();
                response.success = true;
                response.admin = res.data.isAdmin;
                return response;
            })
            .catch((error) => {
                let response = new GetUserRoleModelResponse();
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

    async createUser(request: CreateUserModelRequest, token: string): Promise<CreateUserModelResponse> {
        return await this.axios_instance.post(`api/users/create`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new CreateUserModelResponse();
                response.success = true;
                response.created = res.data.isCreated;

                if(response.created) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new CreateUserModelResponse();
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

    async updateUser(request: UpdateUserModelRequest, token: string): Promise<UpdateUserModelResponse> {
        return await this.axios_instance.put(`api/users/update/${request.id}`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new UpdateUserModelResponse();
                response.success = true;
                response.updated = res.data.isUpdated;

                if(response.updated) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new UpdateUserModelResponse();
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

    async editUser(request: EditUserModelRequest, token: string): Promise<UpdateUserModelResponse> {
        return await this.axios_instance.patch(`api/users/edit/${request.id}`, request, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new UpdateUserModelResponse();
                response.success = true;
                response.updated = res.data.isUpdated;

                if(response.updated) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new UpdateUserModelResponse();
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

    async setUserLockout(request: UserIdModelRequest, token: string): Promise<SetUserSecurityModelResponse> {
        return await this.axios_instance.get(`api/users/set/lockout/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new SetUserSecurityModelResponse();
                response.success = true;
                response.set = res.data.isSet;

                if(response.set) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new SetUserSecurityModelResponse();
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

    async resetUserLockout(request: UserIdModelRequest, token: string): Promise<ResetUserSecurityModelResponse> {
        return await this.axios_instance.get(`api/users/reset/lockout/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ResetUserSecurityModelResponse();
                response.success = true;
                response.reset = res.data.isReset;

                if(response.reset) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new ResetUserSecurityModelResponse();
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

    async resetUserTOTP(request: UserIdModelRequest, token: string): Promise<ResetUserSecurityModelResponse> {
        return await this.axios_instance.get(`api/users/reset/2fa/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new ResetUserSecurityModelResponse();
                response.success = true;
                response.reset = res.data.isReset;

                if(response.reset) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;
                    user.username = res.data.user.username;
                    user.firstName = res.data.user.firstName;
                    user.lastName = res.data.user.lastName;
                    user.patronymic = res.data.user.patronymic;
                    user.position = res.data.user.position;
                    user.rank = res.data.user.rank;
                    user.regionId = res.data.user.regionId;
                    user.region = res.data.user.region;
                    user.enabled = res.data.user.isEnabled;
                    user.totpEnabled = res.data.user.isTOTPEnabled;
                    user.lockedOut = res.data.user.isLockedOut;
                    user.role = res.data.user.role;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new ResetUserSecurityModelResponse();
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

    async removeUser(request: UserIdModelRequest, token: string): Promise<DeleteUserModelResponse> {
        return await this.axios_instance.delete(`api/users/remove/${request.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
            .then((res) => {
                let response = new DeleteUserModelResponse();
                response.success = true;
                response.deleted = res.data.isDeleted;

                if(response.deleted) {
                    let user = new UserModelResponse();
                    user.id = res.data.user.id;

                    response.user = user;
                }

                return response;
            })
            .catch((error) => {
                let response = new DeleteUserModelResponse();
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

export default new UsersService();

