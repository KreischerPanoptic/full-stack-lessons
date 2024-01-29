import {useRecoilState} from "recoil";
import React from 'react';
import {Form, Select} from "antd";
import {usersCurrentRoleSelectedState} from "../../../../../recoil/atoms/users/edit/simple/role/role";

const {Option} = Select;

export default function RoleSelect() {

    const [role, setRole] = useRecoilState(usersCurrentRoleSelectedState);

    function handleChangeState(value: any) {
        setRole(value);
    }

    return (
        <Form.Item
            label="Роль"
            style={{
                width: '100%'
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
                    id='role'
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    dropdownStyle={{borderRadius: '15px'}}
                    placeholder="Роль"
                    value={role}
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
