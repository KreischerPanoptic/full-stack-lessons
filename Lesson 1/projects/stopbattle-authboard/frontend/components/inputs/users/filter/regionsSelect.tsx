import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {useEffect} from 'react';
import {Form, message, Select} from "antd";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import axios from "axios";
import {useSession} from "next-auth/react";
import {usersFilterRegionsOptionsState} from "../../../../recoil/atoms/users/filter/regions/regions";
import {usersFilterRegionsSelectedState} from "../../../../recoil/atoms/users/filter/regions/selected";
import GetRegionsModelRequest from "../../../../models/requests/regions/getRegions.model";

const {Option} = Select;

export default function RegionsSelectInput() {
    const { data: session } = useSession();

    const [options, setOptions] = useRecoilState(usersFilterRegionsOptionsState);
    const [regions, setRegions] = useRecoilState(usersFilterRegionsSelectedState);

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    function handleChangeState(value: any) {
        setRegions(value);
    }

    useEffect(() => {
        resetNetworkErrorState();
        let regions = new GetRegionsModelRequest();
        regions.active = true;
        regions.archived = true;
        regions.amount = -1;
        regions.page = 1;

        axios.create().get(`/api/regions?active=${regions.active}&archived=${regions.archived}&page=${regions.page}&amount=${regions.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    let regions = [];
                    for(let region of response.data.regions) {
                        regions.push(region.name)
                    }
                    setOptions(regions);
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
            })
    }, []);

    return (
        <Form.Item
            label="Регіони"
            style={{
                width: '100%',
                marginLeft: '15px'
            }}
        >
            <div
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center'
                }}
                className="space-between rounded-container"
            >
                <Select
                    id='regions'
                    mode="tags"
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    dropdownStyle={{borderRadius: '15px'}}
                    placeholder="Регіони"
                    value={regions}
                    onChange={handleChangeState}
                >
                    {
                        options.map((i, e) => {
                            return (
                                <Option key={e} value={i}>{i}</Option>
                            )
                        })
                    }
                </Select>
            </div>
        </Form.Item>
    );
}
