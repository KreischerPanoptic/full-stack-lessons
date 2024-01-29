import type { NextPage } from 'next'
import React, {useEffect, useState} from "react";
import AdminLayout from "../components/layouts/adminLayout";
import {message} from "antd";
import axios from "axios";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../recoil/atoms/shared/error/error";
import {useSession} from "next-auth/react";
import {regionsGetModeState} from "../recoil/atoms/regions/table/mode/getMode";
import {regionsItemsState} from "../recoil/atoms/regions/table/items/items";
import {regionsRowsState} from "../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../recoil/atoms/regions/table/page/page";
import {regionsAmountState} from "../recoil/atoms/regions/table/amount/amount";
import {regionsLoadingState} from "../recoil/atoms/loaders/pages/regions/loading";
import GetRegionsModelRequest from "../models/requests/regions/getRegions.model";
import RegionModelResponse from "../models/responses/regions/region.model";
import RegionItemModel from "../models/views/regions/regionItem.model";
import TableRegionsCard from "../components/cards/regions/table/tableCard";
import FilterRegionsCard from "../components/cards/regions/filter/filterCard";
import {CreateRegionModalComponent} from "../components/modals/regions/create/createModal";
import {DeleteRegionModalComponent} from "../components/modals/regions/delete/deleteModal";
import {EditRegionModalComponent} from "../components/modals/regions/edit/editModal";

const Regions: NextPage = () => {
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

    useEffect(() => {
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

        axios.create().get(`/api/regions?active=${request.active}&archived=${request.archived}&page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
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
    }, []);

    return (
        <div>
            <FilterRegionsCard/>
            <TableRegionsCard/>
            <CreateRegionModalComponent/>
            <DeleteRegionModalComponent/>
            <EditRegionModalComponent/>
        </div>
    )
}

//@ts-ignore
Regions.auth = true;
//@ts-ignore
Regions.admin = true;

//@ts-ignore
Regions.getLayout = function getLayout(page: any) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default Regions
