import React from "react";
import {message, Modal, Spin} from "antd";
import {useSession} from "next-auth/react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import axios from "axios";
import {EditRegionFormComponent} from "../../../forms/regions/edit/editForm";
import {regionsCreateModalVisibleState} from "../../../../recoil/atoms/regions/modals/create/visible";
import {regionsLoadingState} from "../../../../recoil/atoms/loaders/pages/regions/loading";
import {regionCurrentNameState} from "../../../../recoil/atoms/regions/edit/name/name";
import {regionCurrentNameValueState} from "../../../../recoil/selectors/regions/edit/name/name";
import {regionCurrentNameValidValueState} from "../../../../recoil/selectors/regions/edit/name/nameValid";
import {regionsGetModeState} from "../../../../recoil/atoms/regions/table/mode/getMode";
import {regionsItemsState} from "../../../../recoil/atoms/regions/table/items/items";
import {regionsRowsState} from "../../../../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../../../../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../../../../recoil/atoms/regions/table/page/page";
import {regionsAmountState} from "../../../../recoil/atoms/regions/table/amount/amount";
import GetRegionsModelRequest from "../../../../models/requests/regions/getRegions.model";
import RegionModelResponse from "../../../../models/responses/regions/region.model";
import RegionItemModel from "../../../../models/views/regions/regionItem.model";
import CreateUpdateRegionModelRequest from "../../../../models/requests/regions/createUpdateRegion.model";

export const CreateRegionModalComponent = () => {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [createVisible, setCreateVisible] = useRecoilState(regionsCreateModalVisibleState)
    const [isLoading, setIsLoading] = useRecoilState(regionsLoadingState);

    const resetName = useResetRecoilState(regionCurrentNameState);

    const name = useRecoilValue(regionCurrentNameValueState);

    const nameValid = useRecoilValue(regionCurrentNameValidValueState);

    const setMode = useSetRecoilState(regionsGetModeState);
    const setItems = useSetRecoilState(regionsItemsState);
    const setRows = useSetRecoilState(regionsRowsState);
    const setCount = useSetRecoilState(regionsCountState);
    const setPage = useSetRecoilState(regionsCurrentPageState);

    const [amount, setAmount] = useRecoilState(regionsAmountState);

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
    };

    const handleCancel = () => {
        resetName();

        resetNetworkErrorState();
        setCreateVisible(false);
        setIsLoading(false);
    }

    const handleCreate = async() => {
        resetNetworkErrorState();
        setIsLoading(true);

        let request = new CreateUpdateRegionModelRequest();
        request.name = name;

        axios.create().post(`/api/regions/create`, request,{headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.created) {
                        message.success(`Створено новий регіон з назвою - ${response.data.region.name}`);
                        setCreateVisible(false);
                        resetName();
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
            <Modal title="Додати регіон"
                   width='50%'
                   visible={createVisible}
                   okButtonProps={{
                       disabled: !(nameValid)
                   }}
                   okType='primary'
                   onOk={handleCreate}
                   onCancel={handleCancel}
                   okText="Створити"
                   cancelText="Скасувати"
            >
                <EditRegionFormComponent/>
            </Modal>
        </Spin>
    );
};
