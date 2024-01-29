import React from "react";
import {message, Modal, Spin} from "antd";
import {EditFormComponent} from "../../../forms/users/edit/editForm";
import {useSession} from "next-auth/react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import {usersLoadingState} from "../../../../recoil/atoms/loaders/pages/users/loading";
import {usersCreateModalVisibleState} from "../../../../recoil/atoms/users/modals/create/visible";
import {userCurrentUsernameValueState} from "../../../../recoil/selectors/users/edit/simple/username/username";
import {userCurrentUsernameValidValueState} from "../../../../recoil/selectors/users/edit/simple/username/usernameValid";
import {userCurrentPasswordValueState} from "../../../../recoil/selectors/users/edit/simple/password/password";
import {userCurrentPasswordValidValueState} from "../../../../recoil/selectors/users/edit/simple/password/passwordValid";
import {userCurrentPasswordConfirmationValueState} from "../../../../recoil/selectors/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {usersCurrentRoleSelectedValueState} from "../../../../recoil/selectors/users/edit/simple/role/role";
import {usersCurrentRegionSelectedValueState} from "../../../../recoil/selectors/users/edit/simple/region/region";
import {userCurrentFirstNameValueState} from "../../../../recoil/selectors/users/edit/advanced/firstName/firstName";
import {userCurrentLastNameValueState} from "../../../../recoil/selectors/users/edit/advanced/lastName/lastName";
import {userCurrentPatronymicValueState} from "../../../../recoil/selectors/users/edit/advanced/patronymic/patronymic";
import {userCurrentPositionValueState} from "../../../../recoil/selectors/users/edit/advanced/position/position";
import {userCurrentRankValueState} from "../../../../recoil/selectors/users/edit/advanced/rank/rank";
import {userCurrentPasswordConfirmationValidValueState} from "../../../../recoil/selectors/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {usersCurrentRoleSelectedValidValueState} from "../../../../recoil/selectors/users/edit/simple/role/roleValid";
import {usersCurrentRegionSelectedValidValueState} from "../../../../recoil/selectors/users/edit/simple/region/regionValid";
import {userCurrentFirstNameValidValueState} from "../../../../recoil/selectors/users/edit/advanced/firstName/firstNameValid";
import {userCurrentLastNameValidValueState} from "../../../../recoil/selectors/users/edit/advanced/lastName/lastNameValid";
import {userCurrentPatronymicValidValueState} from "../../../../recoil/selectors/users/edit/advanced/patronymic/patronymicValid";
import {userCurrentPositionValidValueState} from "../../../../recoil/selectors/users/edit/advanced/position/positionValid";
import {userCurrentRankValidValueState} from "../../../../recoil/selectors/users/edit/advanced/rank/rankValid";
import {userCurrentUsernameState} from "../../../../recoil/atoms/users/edit/simple/username/username";
import {userCurrentPasswordState} from "../../../../recoil/atoms/users/edit/simple/password/password";
import {userCurrentPasswordConfirmationState} from "../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {usersCurrentRoleSelectedState} from "../../../../recoil/atoms/users/edit/simple/role/role";
import {usersCurrentRegionSelectedState} from "../../../../recoil/atoms/users/edit/simple/region/region";
import {userCurrentFirstNameState} from "../../../../recoil/atoms/users/edit/advanced/firstName/firstName";
import {userCurrentLastNameState} from "../../../../recoil/atoms/users/edit/advanced/lastName/lastName";
import {userCurrentPatronymicState} from "../../../../recoil/atoms/users/edit/advanced/patronymic/patronymic";
import {userCurrentPositionState} from "../../../../recoil/atoms/users/edit/advanced/position/position";
import {userCurrentRankState} from "../../../../recoil/atoms/users/edit/advanced/rank/rank";
import CreateUserModelRequest from "../../../../models/requests/users/createUser.model";
import axios from "axios";
import {usersGetModeState} from "../../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../../recoil/atoms/users/table/amount/amount";
import GetUsersModelRequest from "../../../../models/requests/users/getUsers.model";
import UserModelResponse from "../../../../models/responses/users/user.model";
import UserItemModel from "../../../../models/views/users/userItem.model";

export const CreateUserModalComponent = () => {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [createVisible, setCreateVisible] = useRecoilState(usersCreateModalVisibleState)
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const resetUsername = useResetRecoilState(userCurrentUsernameState);
    const resetPassword = useResetRecoilState(userCurrentPasswordState);
    const resetPasswordConfirmation = useResetRecoilState(userCurrentPasswordConfirmationState);
    const resetRole = useResetRecoilState(usersCurrentRoleSelectedState);
    const resetRegion = useResetRecoilState(usersCurrentRegionSelectedState);
    const resetFirstName = useResetRecoilState(userCurrentFirstNameState);
    const resetLastName = useResetRecoilState(userCurrentLastNameState);
    const resetPatronymic = useResetRecoilState(userCurrentPatronymicState);
    const resetPosition = useResetRecoilState(userCurrentPositionState);
    const resetRank = useResetRecoilState(userCurrentRankState);

    const username = useRecoilValue(userCurrentUsernameValueState);
    const password = useRecoilValue(userCurrentPasswordValueState);
    const passwordConfirmation = useRecoilValue(userCurrentPasswordConfirmationValueState);
    const role = useRecoilValue(usersCurrentRoleSelectedValueState);
    const region = useRecoilValue(usersCurrentRegionSelectedValueState);
    const firstName = useRecoilValue(userCurrentFirstNameValueState);
    const lastName = useRecoilValue(userCurrentLastNameValueState);
    const patronymic = useRecoilValue(userCurrentPatronymicValueState);
    const position = useRecoilValue(userCurrentPositionValueState);
    const rank = useRecoilValue(userCurrentRankValueState);

    const usernameValid = useRecoilValue(userCurrentUsernameValidValueState);
    const passwordValid = useRecoilValue(userCurrentPasswordValidValueState);
    const passwordConfirmationValid = useRecoilValue(userCurrentPasswordConfirmationValidValueState);
    const roleValid = useRecoilValue(usersCurrentRoleSelectedValidValueState);
    const regionValid = useRecoilValue(usersCurrentRegionSelectedValidValueState);
    const firstNameValid = useRecoilValue(userCurrentFirstNameValidValueState);
    const lastNameValid = useRecoilValue(userCurrentLastNameValidValueState);
    const patronymicValid = useRecoilValue(userCurrentPatronymicValidValueState);
    const positionValid = useRecoilValue(userCurrentPositionValidValueState);
    const rankValid = useRecoilValue(userCurrentRankValidValueState);

    const setMode = useSetRecoilState(usersGetModeState);
    const setItems = useSetRecoilState(usersItemsState);
    const setRows = useSetRecoilState(usersRowsState);
    const setCount = useSetRecoilState(usersCountState);
    const setPage = useSetRecoilState(usersCurrentPageState);

    const [amount, setAmount] = useRecoilState(usersAmountState);

    const refresh = async () => {
        let amnt = amount;
        if(amount <= 0) {
            setAmount(10);
            amnt = 10;
        }

        setMode('page');
        setCount(0);
        setPage(1);
        setItems([]);
        setRows([]);

        let request = new GetUsersModelRequest();
        request.active = true;
        request.archived = false;
        request.page = 1;
        request.amount = amnt;

        resetNetworkErrorState();

        setIsLoading(true);

        await axios.create().get(`/api/users?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    setCount(response.data.count);
                    setAmount(response.data.amount);
                    setPage(response.data.page);

                    let users: UserModelResponse[] = [];
                    let rows: UserItemModel[] = [];
                    for(let user of response.data.users) {
                        users.push(user);

                        let row: UserItemModel = new UserItemModel();
                        row.key = `${user.id}`;
                        row.username = user.username;
                        row.firstName = user.firstName && user.firstName.length > 0 ? user.firstName : '-';
                        row.lastName = user.lastName && user.lastName.length > 0 ? user.lastName : '-';
                        row.patronymic = user.patronymic && user.patronymic.length > 0 ? user.patronymic : '-';
                        row.position = user.position && user.position.length > 0 ? user.position : '-';
                        row.rank = user.rank && user.rank.length > 0 ? user.rank : '-';
                        row.region = user.region && user.region.length > 0 ? user.region : '-';
                        row.isEnabled = user.enabled;
                        row.isTOTPEnabled = user.totpEnabled;
                        row.isLockedOut = user.lockedOut;
                        row.role = user.role;
                        rows.push(row);
                    }
                    setItems(users);
                    setRows(rows);
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
            })
            .finally(() => {setIsLoading(false);})
    };

    const handleCancel = () => {
        resetUsername();
        resetPassword();
        resetPasswordConfirmation();
        resetRole();
        resetRegion();
        resetFirstName();
        resetLastName();
        resetPatronymic();
        resetPosition();
        resetRank();

        resetNetworkErrorState();
        setCreateVisible(false);
        setIsLoading(false);
    }

    const handleCreate = async() => {
        resetNetworkErrorState();
        setIsLoading(true);

        let request = new CreateUserModelRequest();
        request.username = username;
        request.password = password;
        request.confirmPassword = passwordConfirmation;
        request.role = role === 'reader' || role === 'creator' || role === 'volunteer' ? role : 'volunteer';
        request.regionId = region ? region : -1;

        if(firstName.length > 0) {
            request.firstName = firstName;
        }

        if(lastName.length > 0) {
            request.lastName = lastName;
        }

        if(patronymic.length > 0) {
            request.patronymic = patronymic;
        }

        if(position.length > 0) {
            request.position = position;
        }

        if(rank.length > 0) {
            request.rank = rank;
        }

        axios.create().post(`/api/users/create`, request,{headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.created) {
                        message.success(`Створено нового користувача з логіном - ${response.data.user.username}`);
                        setCreateVisible(false);
                        resetUsername();
                        resetPassword();
                        resetPasswordConfirmation();
                        resetRole();
                        resetRegion();
                        resetFirstName();
                        resetLastName();
                        resetPatronymic();
                        resetPosition();
                        resetRank();
                        await refresh();
                    }
                    else {
                        message.error(response.data.error);
                        setNetworkErrorState(response.data.error);
                    }
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
            })
            .finally(() => {setIsLoading(false);})
    }

    return (
        <Spin spinning={isLoading}>
            <Modal title="Додати користувача"
                   width='50%'
                   visible={createVisible}
                   okButtonProps={{
                       disabled: !(usernameValid && passwordValid
                       && passwordConfirmationValid && roleValid
                       && regionValid && firstNameValid
                       && lastNameValid && patronymicValid
                       && positionValid && rankValid)
                   }}
                   okType='primary'
                   onOk={handleCreate}
                   onCancel={handleCancel}
                   okText="Створити"
                   cancelText="Скасувати"
            >
                <EditFormComponent/>
            </Modal>
        </Spin>
    );
};
