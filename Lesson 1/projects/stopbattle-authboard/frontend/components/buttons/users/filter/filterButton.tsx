import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import Button from "antd-button-color";
import {Form, message} from "antd";
import {usersFilterActiveValueState} from "../../../../recoil/selectors/users/filter/active/active";
import {usersFilterArchivedValueState} from "../../../../recoil/selectors/users/filter/archived/archived";
import {usersFilterUsernamesSelectedValueState} from "../../../../recoil/selectors/users/filter/usernames/selected";
import {usersFilterRegionsSelectedValueState} from "../../../../recoil/selectors/users/filter/regions/selected";
import {usersFilterRolesSelectedValueState} from "../../../../recoil/selectors/users/filter/roles/selected";
import {usersFilterFirstNamesSelectedValueState} from "../../../../recoil/selectors/users/filter/firstNames/selected";
import {usersFilterLastNamesSelectedValueState} from "../../../../recoil/selectors/users/filter/lastNames/selected";
import {usersGetModeState} from "../../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../../recoil/atoms/users/table/amount/amount";
import FilterUsersModelRequest from "../../../../models/requests/users/filterUsers.model";
import FilterParamsModel from "../../../../models/requests/users/filterParams.model";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import UserModelResponse from "../../../../models/responses/users/user.model";
import UserItemModel from "../../../../models/views/users/userItem.model";
import {usersLoadingState} from "../../../../recoil/atoms/loaders/pages/users/loading";


export default function FilterUsersButton() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const active = useRecoilValue(usersFilterActiveValueState);
    const archived = useRecoilValue(usersFilterArchivedValueState);
    const usernames = useRecoilValue(usersFilterUsernamesSelectedValueState);
    const regions = useRecoilValue(usersFilterRegionsSelectedValueState);
    const roles = useRecoilValue(usersFilterRolesSelectedValueState);
    const firstNames = useRecoilValue(usersFilterFirstNamesSelectedValueState);
    const lastNames = useRecoilValue(usersFilterLastNamesSelectedValueState);

    const setMode = useSetRecoilState(usersGetModeState);
    const setItems = useSetRecoilState(usersItemsState);
    const setRows = useSetRecoilState(usersRowsState);
    const setCount = useSetRecoilState(usersCountState);
    const setPage = useSetRecoilState(usersCurrentPageState);

    const [amount, setAmount] = useRecoilState(usersAmountState);
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const filter = async () => {
        let amnt = amount;
        if(amount <= 0) {
            setAmount(10);
            amnt = 10;
        }
        setMode('filtered');
        setCount(0);
        setPage(1);
        setItems([]);
        setRows([]);

        let filterRequest = new FilterUsersModelRequest();
        filterRequest.active = active;
        filterRequest.archived = archived;
        filterRequest.page = 1;
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

    return (
        <Form.Item
            style={{
                width: "25%",
                marginLeft: '15px',
                marginTop: '24px'
            }}
        >
            <Button
                type="primary"
                style={{
                    width: '100%',
                    borderRadius: '5px',
                }}
                onClick={async () => {
                    await filter();
                }}
            >
                Сортувати
            </Button>
        </Form.Item>
    );
}
