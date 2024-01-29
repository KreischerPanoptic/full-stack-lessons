import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import {Form, Select} from "antd";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import {usersFilterRolesSelectedState} from "../../../../recoil/atoms/users/filter/roles/selected";

const {Option} = Select;

export default function RolesSelectInput() {

    const [roles, setRoles] = useRecoilState(usersFilterRolesSelectedState);

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    function handleChangeState(value: any) {
        setRoles(value);
    }

    return (
        <Form.Item
            label="Ролі"
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
                    id='usernames'
                    mode="tags"
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    dropdownStyle={{borderRadius: '15px'}}
                    placeholder="Ролі"
                    value={roles}
                    onChange={handleChangeState}
                >
                    <Option value='reader'>Читач</Option>
                    <Option value='creator'>Редактор</Option>
                    <Option value='volunteer'>Волонтер</Option>
                </Select>
            </div>
        </Form.Item>
    );
}
