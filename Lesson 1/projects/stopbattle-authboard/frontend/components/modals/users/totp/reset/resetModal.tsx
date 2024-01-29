import React from "react";
import {message, Modal, Spin} from "antd";
import {useSession} from "next-auth/react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../../../../../recoil/atoms/shared/error/error";
import {usersLoadingState} from "../../../../../recoil/atoms/loaders/pages/users/loading";
import {userCurrentUsernameValueState} from "../../../../../recoil/selectors/users/edit/simple/username/username";
import {userCurrentUsernameState} from "../../../../../recoil/atoms/users/edit/simple/username/username";
import {userCurrentPasswordState} from "../../../../../recoil/atoms/users/edit/simple/password/password";
import {userCurrentPasswordConfirmationState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {usersCurrentRoleSelectedState} from "../../../../../recoil/atoms/users/edit/simple/role/role";
import {usersCurrentRegionSelectedState} from "../../../../../recoil/atoms/users/edit/simple/region/region";
import {userCurrentFirstNameState} from "../../../../../recoil/atoms/users/edit/advanced/firstName/firstName";
import {userCurrentLastNameState} from "../../../../../recoil/atoms/users/edit/advanced/lastName/lastName";
import {userCurrentPatronymicState} from "../../../../../recoil/atoms/users/edit/advanced/patronymic/patronymic";
import {userCurrentPositionState} from "../../../../../recoil/atoms/users/edit/advanced/position/position";
import {userCurrentRankState} from "../../../../../recoil/atoms/users/edit/advanced/rank/rank";
import axios from "axios";
import {userCurrentIdValueState} from "../../../../../recoil/selectors/users/edit/simple/id/id";
import {userCurrentIdState} from "../../../../../recoil/atoms/users/edit/simple/id/id";
import {usersCurrentState} from "../../../../../recoil/atoms/users/table/current/current";
import {usersCurrentValueState} from "../../../../../recoil/selectors/users/table/current/current";
import GetUsersModelRequest from "../../../../../models/requests/users/getUsers.model";
import UserModelResponse from "../../../../../models/responses/users/user.model";
import UserItemModel from "../../../../../models/views/users/userItem.model";
import UserIdModelRequest from "../../../../../models/requests/users/userId.model";
import {usersGetModeState} from "../../../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../../../recoil/atoms/users/table/amount/amount";
import {usersResetTOTPModalVisibleState} from "../../../../../recoil/atoms/users/modals/totp/reset/visible";

export const ResetTOTPUserModalComponent = () => {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [resetVisible, setResetVisible] = useRecoilState(usersResetTOTPModalVisibleState)
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const resetCurrent = useResetRecoilState(usersCurrentState);
    const resetId = useResetRecoilState(userCurrentIdState);
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

    const current = useRecoilValue(usersCurrentValueState);
    const id = useRecoilValue(userCurrentIdValueState);
    const username = useRecoilValue(userCurrentUsernameValueState);

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
        resetId();
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

        resetCurrent();
        resetNetworkErrorState();
        setResetVisible(false);
        setIsLoading(false);
    }

    const handleReset = async() => {
        resetNetworkErrorState();
        setIsLoading(true);

        let request = new UserIdModelRequest();
        request.id = id;

        axios.create().get(`/api/users/reset/2fa/${request.id}`,{headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.reset) {
                        message.success(`Скинуто 2FA налаштування користувача з логіном - ${username}`);
                        setResetVisible(false);
                        resetId();
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
            <Modal title={`Скинути 2FA налаштування користувача?`}
                   width='25%'
                   visible={resetVisible}
                   okButtonProps={{
                       disabled: !(id > 0 && current)
                   }}
                   okType='primary'
                   onOk={handleReset}
                   onCancel={handleCancel}
                   okText="Скинути"
                   cancelText="Скасувати"
            >
                <p>{`Ви впевнені, що хочете скинути 2FA налаштування користувача з логіном - ${username}? Увага, це зробить старі налаштування Google Authenticator не дійсними!`}</p>
            </Modal>
        </Spin>
    );
};
