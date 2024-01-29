import React from 'react';
import Button from "antd-button-color";
import {Card, message} from "antd";
import {UsersTableComponent} from "../../../table/users/usersTable";
import {ReloadOutlined, UserAddOutlined} from "@ant-design/icons";
import GetUsersModelRequest from "../../../../models/requests/users/getUsers.model";
import axios from "axios";
import UserModelResponse from "../../../../models/responses/users/user.model";
import UserItemModel from "../../../../models/views/users/userItem.model";
import {useSession} from "next-auth/react";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import {usersGetModeState} from "../../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../../recoil/atoms/users/table/amount/amount";
import {usersLoadingState} from "../../../../recoil/atoms/loaders/pages/users/loading";
import {usersCreateModalVisibleState} from "../../../../recoil/atoms/users/modals/create/visible";
import {userCurrentUsernameValidState} from "../../../../recoil/atoms/users/edit/simple/username/usernameValid";
import {userCurrentPasswordValidState} from "../../../../recoil/atoms/users/edit/simple/password/passwordValid";
import {userCurrentPasswordConfirmationValidState} from "../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {userCurrentFirstNameValidState} from "../../../../recoil/atoms/users/edit/advanced/firstName/firstNameValid";
import {userCurrentLastNameValidState} from "../../../../recoil/atoms/users/edit/advanced/lastName/lastNameValid";
import {userCurrentPatronymicValidState} from "../../../../recoil/atoms/users/edit/advanced/patronymic/patronymicValid";
import {userCurrentPositionValidState} from "../../../../recoil/atoms/users/edit/advanced/position/positionValid";
import {userCurrentRankValidState} from "../../../../recoil/atoms/users/edit/advanced/rank/rankValid";
import {userCurrentUsernameErrorState} from "../../../../recoil/atoms/users/edit/simple/username/usernameError";
import {userCurrentPasswordErrorState} from "../../../../recoil/atoms/users/edit/simple/password/passwordError";
import {userCurrentPasswordConfirmationErrorState} from "../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationError";
import {userCurrentFirstNameErrorState} from "../../../../recoil/atoms/users/edit/advanced/firstName/firstNameError";
import {userCurrentLastNameErrorState} from "../../../../recoil/atoms/users/edit/advanced/lastName/lastNameError";
import {userCurrentPatronymicErrorState} from "../../../../recoil/atoms/users/edit/advanced/patronymic/patronymicError";
import {userCurrentPositionErrorState} from "../../../../recoil/atoms/users/edit/advanced/position/positionError";
import {userCurrentRankErrorState} from "../../../../recoil/atoms/users/edit/advanced/rank/rankError";

export default function TableUsersCard() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(usersGetModeState);
    const setItems = useSetRecoilState(usersItemsState);
    const setRows = useSetRecoilState(usersRowsState);
    const setCount = useSetRecoilState(usersCountState);
    const setPage = useSetRecoilState(usersCurrentPageState);
    const setCreateVisible = useSetRecoilState(usersCreateModalVisibleState);

    const [amount, setAmount] = useRecoilState(usersAmountState);
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const resetUsernameValid = useResetRecoilState(userCurrentUsernameValidState);
    const resetPasswordValid = useResetRecoilState(userCurrentPasswordValidState);
    const resetPasswordConfirmationValid = useResetRecoilState(userCurrentPasswordConfirmationValidState);
    const resetFirstNameValid = useResetRecoilState(userCurrentFirstNameValidState);
    const resetLastNameValid = useResetRecoilState(userCurrentLastNameValidState);
    const resetPatronymicValid = useResetRecoilState(userCurrentPatronymicValidState);
    const resetPositionValid = useResetRecoilState(userCurrentPositionValidState);
    const resetRankValid = useResetRecoilState(userCurrentRankValidState);

    const resetUsernameError = useResetRecoilState(userCurrentUsernameErrorState);
    const resetPasswordError = useResetRecoilState(userCurrentPasswordErrorState);
    const resetPasswordConfirmationError = useResetRecoilState(userCurrentPasswordConfirmationErrorState);
    const resetFirstNameError = useResetRecoilState(userCurrentFirstNameErrorState);
    const resetLastNameError = useResetRecoilState(userCurrentLastNameErrorState);
    const resetPatronymicError = useResetRecoilState(userCurrentPatronymicErrorState);
    const resetPositionError = useResetRecoilState(userCurrentPositionErrorState);
    const resetRankError = useResetRecoilState(userCurrentRankErrorState);

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
    }

    return (
        <Card
            title="Користувачі"
            style={{marginTop: '15px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: '20px', marginBottom: '50px'}}
            extra={
                <div
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Button type="success" shape="circle" disabled={isLoading} loading={isLoading} icon={<UserAddOutlined />} onClick={() => {
                        resetUsernameValid();
                        resetPasswordValid();
                        resetPasswordConfirmationValid();
                        resetFirstNameValid();
                        resetLastNameValid();
                        resetPatronymicValid();
                        resetPositionValid();
                        resetRankValid();

                        resetUsernameError();
                        resetPasswordError();
                        resetPasswordConfirmationError();
                        resetFirstNameError();
                        resetLastNameError();
                        resetPatronymicError();
                        resetPositionError();
                        resetRankError();

                        setCreateVisible(true);
                    }} />
                    <Button type="primary" shape="circle" disabled={isLoading} loading={isLoading} style={{marginLeft: '5px'}} icon={<ReloadOutlined />} onClick={refresh} />
                </div>
            }
        >
            <UsersTableComponent/>
        </Card>
    );
}
