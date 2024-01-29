import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import {Form, Select} from "antd";
import {usersFilterStateValueState} from "../../../../recoil/selectors/users/filter/state/state";
import {usersFilterActiveState} from "../../../../recoil/atoms/users/filter/active/active";
import {usersFilterArchivedState} from "../../../../recoil/atoms/users/filter/archived/archived";

const {Option} = Select;

export default function StateSelectInput() {

    const setActive = useSetRecoilState(usersFilterActiveState);
    const setArchived = useSetRecoilState(usersFilterArchivedState);

    const state = useRecoilValue(usersFilterStateValueState);

    function handleChangeState(value: any) {
        if(value === 'Всі') {
            setActive(true);
            setArchived(true);
        }
        else if(value === 'Активні') {
            setActive(true);
            setArchived(false);
        }
        else if(value === 'Видалені') {
            setActive(false);
            setArchived(true);
        }
        else {
            setActive(true);
            setArchived(false);
        }
    }

    return (
        <Form.Item
            label="Стан"
            style={{
                width: '100%',
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
                    id='state'
                    defaultValue={'Активні'}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px'
                    }}
                    dropdownStyle={{borderRadius: '15px'}}
                    placeholder="Стан"
                    value={state}
                    onChange={handleChangeState}
                >
                    <Option value="Всі">Всі</Option>
                    <Option value="Активні">Активні</Option>
                    <Option value="Видалені">Видалені</Option>
                </Select>
            </div>
        </Form.Item>
    );
}
