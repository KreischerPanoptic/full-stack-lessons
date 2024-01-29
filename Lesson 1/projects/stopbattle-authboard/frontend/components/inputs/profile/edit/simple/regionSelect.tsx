import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {useEffect} from 'react';
import {Form, message, Select} from "antd";
import {networkErrorState} from "../../../../../recoil/atoms/shared/error/error";
import axios from "axios";
import {useSession} from "next-auth/react";
import GetRegionsModelRequest from "../../../../../models/requests/regions/getRegions.model";
import {profileCurrentRegionsOptionsState} from "../../../../../recoil/atoms/profile/edit/region/regions";
import {profileCurrentRegionSelectedState} from "../../../../../recoil/atoms/profile/edit/region/region";

const {Option} = Select;

export default function ProfileRegionSelect() {
    const { data: session } = useSession();

    const [options, setOptions] = useRecoilState(profileCurrentRegionsOptionsState);
    const [region, setRegion] = useRecoilState(profileCurrentRegionSelectedState);

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    useEffect(() => {
        resetNetworkErrorState();
        let regions = new GetRegionsModelRequest();
        regions.active = true;
        regions.archived = false;
        regions.amount = -1;
        regions.page = 1;

        axios.create().get(`/api/regions?active=${regions.active}&archived=${regions.archived}&page=${regions.page}&amount=${regions.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    let regions = [];
                    for(let region of response.data.regions) {
                        regions.push(region)
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
            label="Регіон"
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
                    disabled
                    id='region'
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    dropdownStyle={{borderRadius: '15px'}}
                    placeholder="Регіон"
                    value={region?.name}
                >
                    {
                        options.map((i, e) => {
                            return (
                                <Option key={e} value={i.name}>{i.name}</Option>
                            )
                        })
                    }
                </Select>
            </div>
        </Form.Item>
    );
}
