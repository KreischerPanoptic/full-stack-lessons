import type { NextPage } from 'next'
import React, {useEffect} from "react";
import AdminLayout from "../components/layouts/adminLayout";
import {message} from "antd";
import axios from "axios";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../recoil/atoms/shared/error/error";
import {useSession} from "next-auth/react";
import {logsGetModeState} from "../recoil/atoms/logs/table/mode/getMode";
import {logsItemsState} from "../recoil/atoms/logs/table/items/items";
import {logsRowsState} from "../recoil/atoms/logs/table/rows/rows";
import {logsCountState} from "../recoil/atoms/logs/table/count/count";
import {logsCurrentPageState} from "../recoil/atoms/logs/table/page/page";
import {logsAmountState} from "../recoil/atoms/logs/table/amount/amount";
import {logsLoadingState} from "../recoil/atoms/loaders/pages/logs/loading";
import GetLogsModelRequest from "../models/requests/logs/getLogs.model";
import LogModelResponse from "../models/responses/logs/log.model";
import LogItemModel from "../models/views/logs/logItem.model";
import TableLogsCard from "../components/cards/logs/table/tableCard";
import FilterLogsCard from "../components/cards/logs/filter/filterCard";

const Logs: NextPage = () => {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(logsGetModeState);
    const setItems = useSetRecoilState(logsItemsState);
    const setRows = useSetRecoilState(logsRowsState);
    const setCount = useSetRecoilState(logsCountState);
    const setPage = useSetRecoilState(logsCurrentPageState);

    const [amount, setAmount] = useRecoilState(logsAmountState);
    const [isLoading, setIsLoading] = useRecoilState(logsLoadingState);

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

        let request = new GetLogsModelRequest();
        request.page = 1;
        request.amount = amnt;

        resetNetworkErrorState();

        setIsLoading(true);

        axios.create().get(`/api/logs?page=${request.page}&amount=${request.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    setCount(response.data.count);
                    setAmount(response.data.amount);
                    setPage(response.data.page);

                    let logs: LogModelResponse[] = [];
                    let rows: LogItemModel[] = [];
                    for(let log of response.data.logs) {
                        logs.push(log);

                        let row: LogItemModel = new LogItemModel();
                        row.key = `${log.id}`;
                        row.subject = log.subject.username;
                        row.user = log.user ? log.user.username : '-';
                        row.region = log.region ? log.region.name : '-';
                        row.role = log.roleId ? log.role : '-';
                        row.action = log.action;
                        row.loggedAt = new Date(log.loggedAt).toLocaleString();
                        rows.push(row);
                    }
                    setItems(logs);
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
            <FilterLogsCard/>
            <TableLogsCard/>
        </div>
    )
}

//@ts-ignore
Logs.auth = true;
//@ts-ignore
Logs.admin = true;

//@ts-ignore
Logs.getLayout = function getLayout(page: any) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default Logs
