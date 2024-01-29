import React from 'react';
import Button from "antd-button-color";
import {Card, message} from "antd";
import {FolderAddOutlined, ReloadOutlined, UserAddOutlined} from "@ant-design/icons";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import {regionsGetModeState} from "../../../../recoil/atoms/regions/table/mode/getMode";
import {regionsItemsState} from "../../../../recoil/atoms/regions/table/items/items";
import {regionsRowsState} from "../../../../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../../../../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../../../../recoil/atoms/regions/table/page/page";
import {regionsCreateModalVisibleState} from "../../../../recoil/atoms/regions/modals/create/visible";
import {regionsAmountState} from "../../../../recoil/atoms/regions/table/amount/amount";
import {regionsLoadingState} from "../../../../recoil/atoms/loaders/pages/regions/loading";
import {regionCurrentNameValidState} from "../../../../recoil/atoms/regions/edit/name/nameValid";
import {regionCurrentNameErrorState} from "../../../../recoil/atoms/regions/edit/name/nameError";
import GetRegionsModelRequest from "../../../../models/requests/regions/getRegions.model";
import RegionModelResponse from "../../../../models/responses/regions/region.model";
import RegionItemModel from "../../../../models/views/regions/regionItem.model";
import {RegionsTableComponent} from "../../../table/regions/regionsTable";

export default function TableRegionsCard() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(regionsGetModeState);
    const setItems = useSetRecoilState(regionsItemsState);
    const setRows = useSetRecoilState(regionsRowsState);
    const setCount = useSetRecoilState(regionsCountState);
    const setPage = useSetRecoilState(regionsCurrentPageState);
    const setCreateVisible = useSetRecoilState(regionsCreateModalVisibleState);

    const [amount, setAmount] = useRecoilState(regionsAmountState);
    const [isLoading, setIsLoading] = useRecoilState(regionsLoadingState);

    const resetNameValid = useResetRecoilState(regionCurrentNameValidState);

    const resetNameError = useResetRecoilState(regionCurrentNameErrorState);

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

        let request = new GetRegionsModelRequest();
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
        <Card
            title="Регіони"
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
                    <Button type="success" shape="circle" disabled={isLoading} loading={isLoading} icon={<FolderAddOutlined />} onClick={() => {
                        resetNameValid();
                        resetNameError();
                        setCreateVisible(true);
                    }} />
                    <Button type="primary" shape="circle" disabled={isLoading} loading={isLoading} style={{marginLeft: '5px'}} icon={<ReloadOutlined />} onClick={refresh} />
                </div>
            }
        >
            <RegionsTableComponent/>
        </Card>
    );
}
