import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {useEffect} from 'react';
import {Form, message, Select} from "antd";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import axios from "axios";
import GetUsersModelRequest from "../../../../models/requests/users/getUsers.model";
import {useSession} from "next-auth/react";
import {usersFilterFirstNamesOptionsState} from "../../../../recoil/atoms/users/filter/firstNames/firstNames";
import {usersFilterFirstNamesSelectedState} from "../../../../recoil/atoms/users/filter/firstNames/selected";

const {Option} = Select;

export default function FirstNamesSelectInput() {
    const { data: session } = useSession();

    const [options, setOptions] = useRecoilState(usersFilterFirstNamesOptionsState);
    const [firstNames, setFirstNames] = useRecoilState(usersFilterFirstNamesSelectedState);

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    function handleChangeState(value: any) {
        setFirstNames(value);
    }

    useEffect(() => {
        resetNetworkErrorState();
        let users = new GetUsersModelRequest();
        users.active = true;
        users.archived = true;
        users.amount = -1;
        users.page = 1;

        axios.create().get(`/api/users?active=${users.active}&archived=${users.archived}&page=${users.page}&amount=${users.amount}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    let names = [];
                    for(let user of response.data.users) {
                        names.push(user.firstName)
                    }
                    setOptions(names);
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
            label="Ім'я"
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
                    id='firstName'
                    mode="tags"
                    dropdownStyle={{borderRadius: '15px'}}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    placeholder="Ім'я"
                    value={firstNames}
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
