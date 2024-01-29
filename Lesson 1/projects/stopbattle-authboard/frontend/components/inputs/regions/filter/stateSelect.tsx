import {useRecoilValue, useSetRecoilState} from "recoil";
import React from 'react';
import {Form, Select} from "antd";
import {regionsFilterActiveState} from "../../../../recoil/atoms/regions/filter/active/active";
import {regionsFilterArchivedState} from "../../../../recoil/atoms/regions/filter/archived/archived";
import {regionsFilterStateValueState} from "../../../../recoil/selectors/regions/filter/state/state";

const {Option} = Select;

export default function StateRegionsSelectInput() {

    const setActive = useSetRecoilState(regionsFilterActiveState);
    const setArchived = useSetRecoilState(regionsFilterArchivedState);

    const state = useRecoilValue(regionsFilterStateValueState);

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
