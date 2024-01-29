import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import Button from "antd-button-color";
import {Form, message} from "antd";
import {usersGetModeState} from "../../../../recoil/atoms/users/table/mode/getMode";
import {usersItemsState} from "../../../../recoil/atoms/users/table/items/items";
import {usersRowsState} from "../../../../recoil/atoms/users/table/rows/rows";
import {usersCountState} from "../../../../recoil/atoms/users/table/count/count";
import {usersCurrentPageState} from "../../../../recoil/atoms/users/table/page/page";
import {usersAmountState} from "../../../../recoil/atoms/users/table/amount/amount";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import UserModelResponse from "../../../../models/responses/users/user.model";
import UserItemModel from "../../../../models/views/users/userItem.model";
import GetUsersModelRequest from "../../../../models/requests/users/getUsers.model";
import {usersLoadingState} from "../../../../recoil/atoms/loaders/pages/users/loading";


export default function ClearUsersButton() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(usersGetModeState);
    const setItems = useSetRecoilState(usersItemsState);
    const setRows = useSetRecoilState(usersRowsState);
    const setCount = useSetRecoilState(usersCountState);
    const setPage = useSetRecoilState(usersCurrentPageState);

    const [amount, setAmount] = useRecoilState(usersAmountState);
    const [isLoading, setIsLoading] = useRecoilState(usersLoadingState);

    const clear = async () => {
        let amnt = 10;
        setAmount(10);

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
        <Form.Item
            style={{
                width: "25%",
                marginLeft: '15px',
                marginTop: '24px'
            }}
        >
            <Button
                type="danger"
                style={{
                    width: '100%',
                    borderRadius: '5px'
                }}
                onClick={async () => {
                    await clear();
                }}
            >
                Очистити
            </Button>
        </Form.Item>
    );
}
