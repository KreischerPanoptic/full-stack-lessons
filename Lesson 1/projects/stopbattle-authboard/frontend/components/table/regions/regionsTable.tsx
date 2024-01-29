import React from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {message, Space, Table} from "antd";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../recoil/atoms/shared/error/error";
import axios from "axios";
import Button from "antd-button-color";
import {
    DeleteOutlined,
    EditOutlined,
    UserDeleteOutlined
} from "@ant-design/icons";
import {regionsFilterActiveValueState} from "../../../recoil/selectors/regions/filter/active/active";
import {regionsFilterArchivedValueState} from "../../../recoil/selectors/regions/filter/archived/archived";
import {regionsAllPagesValueState} from "../../../recoil/selectors/regions/table/page/pages";
import {regionsCurrentPageValueState} from "../../../recoil/selectors/regions/table/page/page";
import {regionsCountValueState} from "../../../recoil/selectors/regions/table/count/count";
import {regionsRowsValueState} from "../../../recoil/selectors/regions/table/rows/rows";
import {regionsItemsValueState} from "../../../recoil/selectors/regions/table/items/items";
import {regionsGetModeValueState} from "../../../recoil/selectors/regions/table/mode/getMode";
import {regionsItemsState} from "../../../recoil/atoms/regions/table/items/items";
import {regionsCurrentState} from "../../../recoil/atoms/regions/table/current/current";
import {regionsGetModeState} from "../../../recoil/atoms/regions/table/mode/getMode";
import {regionsRowsState} from "../../../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../../../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../../../recoil/atoms/regions/table/page/page";
import {regionsDeleteModalVisibleState} from "../../../recoil/atoms/regions/modals/delete/visible";
import {regionsEditModalVisibleState} from "../../../recoil/atoms/regions/modals/edit/visible";
import {regionCurrentIdState} from "../../../recoil/atoms/regions/edit/id/id";
import {regionCurrentNameState} from "../../../recoil/atoms/regions/edit/name/name";
import {regionsLoadingState} from "../../../recoil/atoms/loaders/pages/regions/loading";
import {regionsAmountState} from "../../../recoil/atoms/regions/table/amount/amount";
import {regionCurrentNameErrorState} from "../../../recoil/atoms/regions/edit/name/nameError";
import {regionCurrentNameValidState} from "../../../recoil/atoms/regions/edit/name/nameValid";
import RegionModelResponse from "../../../models/responses/regions/region.model";
import RegionItemModel from "../../../models/views/regions/regionItem.model";
import GetRegionsModelRequest from "../../../models/requests/regions/getRegions.model";

export const RegionsTableComponent = () => {
    const mode = useRecoilValue(regionsGetModeValueState);
    const items = useRecoilValue(regionsItemsValueState);
    const rows = useRecoilValue(regionsRowsValueState);
    const count = useRecoilValue(regionsCountValueState);
    const page = useRecoilValue(regionsCurrentPageValueState);
    const pages = useRecoilValue(regionsAllPagesValueState);

    const active = useRecoilValue(regionsFilterActiveValueState);
    const archived = useRecoilValue(regionsFilterArchivedValueState);

    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const setMode = useSetRecoilState(regionsGetModeState);
    const setCurrent = useSetRecoilState(regionsCurrentState);
    const setItems = useSetRecoilState(regionsItemsState);
    const setRows = useSetRecoilState(regionsRowsState);
    const setCount = useSetRecoilState(regionsCountState);
    const setPage = useSetRecoilState(regionsCurrentPageState);
    const setDeleteVisible = useSetRecoilState(regionsDeleteModalVisibleState);
    const setEditVisible = useSetRecoilState(regionsEditModalVisibleState);

    const resetCurrent = useResetRecoilState(regionsCurrentState);
    const resetId = useResetRecoilState(regionCurrentIdState);
    const resetName = useResetRecoilState(regionCurrentNameState);

    const setId = useSetRecoilState(regionCurrentIdState);
    const setName = useSetRecoilState(regionCurrentNameState);

    const resetNameValid = useResetRecoilState(regionCurrentNameValidState);

    const resetNameError = useResetRecoilState(regionCurrentNameErrorState);

    const [amount, setAmount] = useRecoilState(regionsAmountState);
    const [isLoading, setIsLoading] = useRecoilState(regionsLoadingState);

    const change = async (pagenum: number, size: number) => {
        let amnt = size;
        setAmount(size);
        setPage(pagenum);

        setMode('page');
        setCount(0);
        setItems([]);
        setRows([]);

        let request = new GetRegionsModelRequest();
        request.active = true;
        request.archived = false;
        request.page = pagenum;
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

    const filter = async (pagenum: number, size: number) => {
        let amnt = size;
        setAmount(size);
        setPage(pagenum);

        setMode('filtered');
        setCount(0);
        setItems([]);
        setRows([]);

        let filterRequest = new GetRegionsModelRequest();
        filterRequest.active = active;
        filterRequest.archived = archived;
        filterRequest.page = pagenum;
        filterRequest.amount = amnt;

        resetNetworkErrorState();

        setIsLoading(true);

        await axios.create().get(`api/regions?active=${filterRequest.active}&archived=${filterRequest.archived}&page=${filterRequest.page}&amount=${filterRequest.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
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

    const columns = [
        {
            title: 'Назва регіону',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Кількість користувачів",
            dataIndex: 'usersCount',
            key: 'usersCount',
        },
        {
            title: 'Редагувати',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: RegionItemModel) => (
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
                                        resetNameValid();

                                        resetNameError();

                                        setEditVisible(true);
                                        let current = findCurrent(parseInt(`${record.key}`));
                                        if(current && current.id) {
                                            setId(current.id);
                                            setName(current.name ? current.name : '');
                                        }
                                        else {
                                            resetId();
                                            resetName();

                                            resetCurrent();
                                            resetNetworkErrorState();
                                            setEditVisible(false);
                                            setIsLoading(false);
                                        }
                                    }
                                }/>
                                <Button type="danger" shape="circle" style={{marginLeft: '5px'}} icon={<DeleteOutlined />} onClick={
                                    () => {
                                        resetNameValid();

                                        resetNameError();

                                        let current = findCurrent(parseInt(`${record.key}`));
                                        setDeleteVisible(true);

                                        if(current && current.id) {
                                            setId(current.id);
                                            setName(current.name ? current.name : '');
                                        }
                                        else {
                                            resetId();
                                            resetName();

                                            resetCurrent();
                                            resetNetworkErrorState();
                                            setDeleteVisible(false);
                                            setIsLoading(false);
                                        }
                                    }
                                }/>
                            </React.Fragment>
                            :
                            <h4 style={{color: '#c41a1a'}}>Регіон видалено</h4>
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
                            showTotal: () => { return `Всього ${count} регіонів`; },
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
