import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import Button from "antd-button-color";
import {Form, message} from "antd";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import GetUsersModelRequest from "../../../../models/requests/users/getUsers.model";
import {regionsGetModeState} from "../../../../recoil/atoms/regions/table/mode/getMode";
import {regionsItemsState} from "../../../../recoil/atoms/regions/table/items/items";
import {regionsRowsState} from "../../../../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../../../../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../../../../recoil/atoms/regions/table/page/page";
import {regionsAmountState} from "../../../../recoil/atoms/regions/table/amount/amount";
import {regionsLoadingState} from "../../../../recoil/atoms/loaders/pages/regions/loading";
import RegionModelResponse from "../../../../models/responses/regions/region.model";
import RegionItemModel from "../../../../models/views/regions/regionItem.model";


export default function ClearRegionsButton() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(regionsGetModeState);
    const setItems = useSetRecoilState(regionsItemsState);
    const setRows = useSetRecoilState(regionsRowsState);
    const setCount = useSetRecoilState(regionsCountState);
    const setPage = useSetRecoilState(regionsCurrentPageState);

    const [amount, setAmount] = useRecoilState(regionsAmountState);
    const [isLoading, setIsLoading] = useRecoilState(regionsLoadingState);

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

        await axios.create().get(`/api/regions?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    setCount(response.data.count);
                    setAmount(response.data.amount);
                    setPage(response.data.page);

                    let regions: RegionModelResponse[] = [];
                    let rows: RegionItemModel[] = [];
                    for(let region of response.data.regions) {
                        regions.push(region);

                        let row: RegionItemModel = new RegionItemModel();
                        row.key = `${region.id}`;
                        row.name = region.name;
                        row.usersCount = region.usersCount;
                        row.isEnabled = !region.archived;

                        rows.push(row);
                    }
                    setItems(regions);
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
