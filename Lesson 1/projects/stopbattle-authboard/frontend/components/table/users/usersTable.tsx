import React from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {usersGetModeValueState} from "../../../recoil/selectors/users/table/mode/getMode";
import {usersItemsValueState} from "../../../recoil/selectors/users/table/items/items";
import {usersRowsValueState} from "../../../recoil/selectors/users/table/rows/rows";
import {usersCountValueState} from "../../../recoil/selectors/users/table/count/count";
import {usersCurrentPageValueState} from "../../../recoil/selectors/users/table/page/page";
import {message, Space, Table} from "antd";
import {usersAllPagesValueState} from "../../../recoil/selectors/users/table/page/pages";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../recoil/atoms/shared/error/error";
import {usersGetModeState} from "../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../recoil/atoms/users/table/amount/amount";
import GetUsersModelRequest from "../../../models/requests/users/getUsers.model";
import axios from "axios";
import UserModelResponse from "../../../models/responses/users/user.model";
import UserItemModel from "../../../models/views/users/userItem.model";
import {usersCurrentState} from "../../../recoil/atoms/users/table/current/current";
import FilterUsersModelRequest from "../../../models/requests/users/filterUsers.model";
import FilterParamsModel from "../../../models/requests/users/filterParams.model";
import {usersFilterActiveValueState} from "../../../recoil/selectors/users/filter/active/active";
import {usersFilterArchivedValueState} from "../../../recoil/selectors/users/filter/archived/archived";
import {usersFilterUsernamesSelectedValueState} from "../../../recoil/selectors/users/filter/usernames/selected";
import {usersFilterRegionsSelectedValueState} from "../../../recoil/selectors/users/filter/regions/selected";
import {usersFilterRolesSelectedValueState} from "../../../recoil/selectors/users/filter/roles/selected";
import {usersFilterFirstNamesSelectedValueState} from "../../../recoil/selectors/users/filter/firstNames/selected";
import {usersFilterLastNamesSelectedValueState} from "../../../recoil/selectors/users/filter/lastNames/selected";
import Button from "antd-button-color";
import {
    CheckCircleTwoTone, CloseCircleTwoTone,
    EditOutlined,
    LockOutlined,
    UnlockOutlined,
    UserDeleteOutlined
} from "@ant-design/icons";
import {usersLoadingState} from "../../../recoil/atoms/loaders/pages/users/loading";
import {usersDeleteModalVisibleState} from "../../../recoil/atoms/users/modals/delete/visible";
import {usersEditModalVisibleState} from "../../../recoil/atoms/users/modals/edit/visible";
import {usersSetLockoutModalVisibleState} from "../../../recoil/atoms/users/modals/lockout/set/visible";
import {usersResetLockoutModalVisibleState} from "../../../recoil/atoms/users/modals/lockout/reset/visible";
import {usersResetTOTPModalVisibleState} from "../../../recoil/atoms/users/modals/totp/reset/visible";
import {userCurrentIdState} from "../../../recoil/atoms/users/edit/simple/id/id";
import {userCurrentUsernameState} from "../../../recoil/atoms/users/edit/simple/username/username";
import {userCurrentPasswordState} from "../../../recoil/atoms/users/edit/simple/password/password";
import {userCurrentPasswordConfirmationState} from "../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {usersCurrentRoleSelectedState} from "../../../recoil/atoms/users/edit/simple/role/role";
import {usersCurrentRegionSelectedState} from "../../../recoil/atoms/users/edit/simple/region/region";
import {userCurrentFirstNameState} from "../../../recoil/atoms/users/edit/advanced/firstName/firstName";
import {userCurrentLastNameState} from "../../../recoil/atoms/users/edit/advanced/lastName/lastName";
import {userCurrentPatronymicState} from "../../../recoil/atoms/users/edit/advanced/patronymic/patronymic";
import {userCurrentPositionState} from "../../../recoil/atoms/users/edit/advanced/position/position";
import {userCurrentRankState} from "../../../recoil/atoms/users/edit/advanced/rank/rank";
import {userCurrentUsernameValidState} from "../../../recoil/atoms/users/edit/simple/username/usernameValid";
import {userCurrentPasswordValidState} from "../../../recoil/atoms/users/edit/simple/password/passwordValid";
import {userCurrentPasswordConfirmationValidState} from "../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {userCurrentFirstNameValidState} from "../../../recoil/atoms/users/edit/advanced/firstName/firstNameValid";
import {userCurrentLastNameValidState} from "../../../recoil/atoms/users/edit/advanced/lastName/lastNameValid";
import {userCurrentPatronymicValidState} from "../../../recoil/atoms/users/edit/advanced/patronymic/patronymicValid";
import {userCurrentPositionValidState} from "../../../recoil/atoms/users/edit/advanced/position/positionValid";
import {userCurrentRankValidState} from "../../../recoil/atoms/users/edit/advanced/rank/rankValid";
import {userCurrentUsernameErrorState} from "../../../recoil/atoms/users/edit/simple/username/usernameError";
import {userCurrentPasswordErrorState} from "../../../recoil/atoms/users/edit/simple/password/passwordError";
import {userCurrentPasswordConfirmationErrorState} from "../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationError";
import {userCurrentFirstNameErrorState} from "../../../recoil/atoms/users/edit/advanced/firstName/firstNameError";
import {userCurrentLastNameErrorState} from "../../../recoil/atoms/users/edit/advanced/lastName/lastNameError";
import {userCurrentPatronymicErrorState} from "../../../recoil/atoms/users/edit/advanced/patronymic/patronymicError";
import {userCurrentPositionErrorState} from "../../../recoil/atoms/users/edit/advanced/position/positionError";
import {userCurrentRankErrorState} from "../../../recoil/atoms/users/edit/advanced/rank/rankError";

export const UsersTableComponent = () => {
    const mode = useRecoilValue(usersGetModeValueState);
    const items = useRecoilValue(usersItemsValueState);
    const rows = useRecoilValue(usersRowsValueState);
    const count = useRecoilValue(usersCountValueState);
    const page = useRecoilValue(usersCurrentPageValueState);
    const pages = useRecoilValue(usersAllPagesValueState);

    const active = useRecoilValue(usersFilterActiveValueState);
    const archived = useRecoilValue(usersFilterArchivedValueState);
    const usernames = useRecoilValue(usersFilterUsernamesSelectedValueState);
    const regions = useRecoilValue(usersFilterRegionsSelectedValueState);
    const roles = useRecoilValue(usersFilterRolesSelectedValueState);
    const firstNames = useRecoilValue(usersFilterFirstNamesSelectedValueState);
    const lastNames = useRecoilValue(usersFilterLastNamesSelectedValueState);

    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(usersGetModeState);
    const setCurrent = useSetRecoilState(usersCurrentState);
    const setItems = useSetRecoilState(usersItemsState);
    const setRows = useSetRecoilState(usersRowsState);
    const setCount = useSetRecoilState(usersCountState);
    const setPage = useSetRecoilState(usersCurrentPageState);
    const setDeleteVisible = useSetRecoilState(usersDeleteModalVisibleState);
    const setEditVisible = useSetRecoilState(usersEditModalVisibleState);
    const setLockoutVisible = useSetRecoilState(usersSetLockoutModalVisibleState);
    const resetLockoutVisible = useSetRecoilState(usersResetLockoutModalVisibleState);
    const resetTOTPVisible = useSetRecoilState(usersResetTOTPModalVisibleState);

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

    const setId = useSetRecoilState(userCurrentIdState);
    const setUsername = useSetRecoilState(userCurrentUsernameState);
    const setRole = useSetRecoilState(usersCurrentRoleSelectedState);
    const setRegion = useSetRecoilState(usersCurrentRegionSelectedState);
    const setFirstName = useSetRecoilState(userCurrentFirstNameState);
    const setLastName = useSetRecoilState(userCurrentLastNameState);
    const setPatronymic = useSetRecoilState(userCurrentPatronymicState);
    const setPosition = useSetRecoilState(userCurrentPositionState);
    const setRank = useSetRecoilState(userCurrentRankState);

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

    const [amount, setAmount] = useRecoilState(usersAmountState);
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const change = async (pagenum: number, size: number) => {
        let amnt = size;
        setAmount(size);
        setPage(pagenum);

        setMode('page');
        setCount(0);
        setItems([]);
        setRows([]);

        let request = new GetUsersModelRequest();
        request.active = true;
        request.archived = false;
        request.page = pagenum;
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

    const filter = async (pagenum: number, size: number) => {
        let amnt = size;
        setAmount(size);
        setPage(pagenum);

        setMode('filtered');
        setCount(0);
        setItems([]);
        setRows([]);

        let filterRequest = new FilterUsersModelRequest();
        filterRequest.active = active;
        filterRequest.archived = archived;
        filterRequest.page = pagenum;
        filterRequest.amount = amnt;
        filterRequest.params = new FilterParamsModel();
        filterRequest.params.usernames = usernames;
        filterRequest.params.roles = roles;
        filterRequest.params.regions = regions;
        filterRequest.params.firstNames = firstNames;
        filterRequest.params.lastNames = lastNames;

        resetNetworkErrorState();

        setIsLoading(true);

        await axios.create().post(`api/users/filter?active=${filterRequest.active}&archived=${filterRequest.archived}&page=${filterRequest.page}&amount=${filterRequest.amount}`, filterRequest.params, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
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

    const columns = [
        {
            title: 'Логін',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: "Ім'я",
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: "Ім'я по батькові",
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Посада',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Звання',
            dataIndex: 'rank',
            key: 'rank'
        },
        {
            title: 'Регіон',
            dataIndex: 'region',
            key: 'region'
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: '2FA увімкнено',
            dataIndex: 'isTOTPEnabled',
            key: 'isTOTPEnabled',
            render: (_: any, record: UserItemModel) => (
                <Space size="middle">
                    <div
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Button type="info" shape="circle" disabled={!record.isEnabled || !record.isTOTPEnabled} icon={record.isTOTPEnabled ? <CheckCircleTwoTone twoToneColor="#52c41a"/> : <CloseCircleTwoTone twoToneColor="#c41a1a"/>} onClick={
                            () => {
                                if(record.isEnabled && record.isTOTPEnabled) {
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

                                    let current = findCurrent(parseInt(`${record.key}`));

                                    if (record.isTOTPEnabled) {
                                        resetTOTPVisible(true);

                                        if(current && current.id) {
                                            setId(current.id);
                                            setUsername(current.username ? current.username : '');
                                            setFirstName(current.firstName ? current.firstName : '');
                                            setLastName(current.lastName ? current.lastName : '');
                                            setPatronymic(current.patronymic ? current.patronymic : '');
                                            setRegion(current.regionId);
                                            setRole(current.role ? current.role : '');
                                            setPosition(current.position ? current.position : '');
                                            setRank(current.rank ? current.rank : '');
                                        }
                                        else {
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
                                            setDeleteVisible(false);
                                            setIsLoading(false);
                                        }
                                    }
                                }
                            }
                        }/>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Заблоковано',
            dataIndex: 'isLockedOut',
            key: 'isLockedOut',
            render: (_: any, record: UserItemModel) => (
                <Space size="middle">
                    <div
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Button type={record.isLockedOut ? "danger" :"info"} shape="circle" disabled={!record.isEnabled} icon={record.isLockedOut ? <LockOutlined /> : <UnlockOutlined />} onClick={
                            () => {
                                if(record.isEnabled) {
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
                                    let current = findCurrent(parseInt(`${record.key}`));

                                    if (record.isLockedOut) {
                                        resetLockoutVisible(true);
                                    } else {
                                        setLockoutVisible(true);
                                    }

                                    if(current && current.id) {
                                        setId(current.id);
                                        setUsername(current.username ? current.username : '');
                                        setFirstName(current.firstName ? current.firstName : '');
                                        setLastName(current.lastName ? current.lastName : '');
                                        setPatronymic(current.patronymic ? current.patronymic : '');
                                        setRegion(current.regionId);
                                        setRole(current.role ? current.role : '');
                                        setPosition(current.position ? current.position : '');
                                        setRank(current.rank ? current.rank : '');
                                    }
                                    else {
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
                                        setDeleteVisible(false);
                                        setIsLoading(false);
                                    }
                                }
                            }
                        }/>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Редагувати',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: UserItemModel) => (
                <Space size="middle">
                    <div
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {record.isEnabled ?
                            <React.Fragment>
                                <Button type="warning" shape="circle" icon={<EditOutlined />} onClick={
                                    () => {
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

                                        let current = findCurrent(parseInt(`${record.key}`));
                                        if(current && current.id) {
                                            setId(current.id);
                                            setUsername(current.username ? current.username : '');
                                            setFirstName(current.firstName ? current.firstName : '');
                                            setLastName(current.lastName ? current.lastName : '');
                                            setPatronymic(current.patronymic ? current.patronymic : '');
                                            setRegion(current.regionId);
                                            setRole(current.role ? current.role : '');
                                            setPosition(current.position ? current.position : '');
                                            setRank(current.rank ? current.rank : '');
                                        }
                                        else {
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
                                            setEditVisible(false);
                                            setIsLoading(false);
                                        }
                                        setEditVisible(true);
                                    }
                                }/>
                                <Button type="danger" shape="circle" style={{marginLeft: '5px'}} icon={<UserDeleteOutlined />} onClick={
                                    () => {
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

                                        let current = findCurrent(parseInt(`${record.key}`));
                                        setDeleteVisible(true);

                                        if(current && current.id) {
                                            setId(current.id);
                                            setUsername(current.username ? current.username : '');
                                            setFirstName(current.firstName ? current.firstName : '');
                                            setLastName(current.lastName ? current.lastName : '');
                                            setPatronymic(current.patronymic ? current.patronymic : '');
                                            setRegion(current.regionId);
                                            setRole(current.role ? current.role : '');
                                            setPosition(current.position ? current.position : '');
                                            setRank(current.rank ? current.rank : '');
                                        }
                                        else {
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
                                            setDeleteVisible(false);
                                            setIsLoading(false);
                                        }
                                    }
                                }/>
                            </React.Fragment>
                            :
                            <h4 style={{color: '#c41a1a'}}>Користувача видалено</h4>
                        }
                    </div>
                </Space>
            ),
        },
    ];

    const findCurrent = (id: number) => {
        let indx = items.findIndex((value) => {return value.id === id});
        setCurrent(items[indx]);
        return items[indx];
    }

    return (
        <div
            style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center'
            }}
            className="space-between"
        >
            {
                rows.length! > 0 ?
                    <Table
                        style={{width: '100%'}}
                        loading={isLoading}
                        pagination={{
                            showQuickJumper: mode !== 'all',
                            showSizeChanger: mode !== 'all',
                            position: ['topCenter'],
                            onShowSizeChange: async (current: number, size: number) => {
                                switch(mode) {
                                    case 'page':
                                        await change(current, size);
                                        break;
                                    case 'filtered':
                                        await filter(current, size);
                                        break;
                                }
                            },
                            onChange: async (page: number, size: number) => {
                                switch(mode) {
                                    case 'page':
                                        await change(page, size);
                                        break;
                                    case 'filtered':
                                        await filter(page, size);
                                        break;
                                }
                            },
                            showTotal: () => { return `Всього ${count} користувачів`; },
                            pageSizeOptions: ['10','25','50','100'],
                            pageSize: amount,
                            current: page,
                            total: count
                        }}
                        dataSource={rows}
                        columns={columns}
                        size="middle"
                        scroll={{ x: 300 }}
                    /> :
                    <h1>{"Немає данних"}</h1>
            }
        </div>
    );
};
