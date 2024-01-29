import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {userCurrentRankState} from "../../../../../recoil/atoms/users/edit/advanced/rank/rank";
import {userCurrentRankValidState} from "../../../../../recoil/atoms/users/edit/advanced/rank/rankValid";
import {userCurrentRankErrorState} from "../../../../../recoil/atoms/users/edit/advanced/rank/rankError";

export default function RankInput() {
    const [rank, setRank] = useRecoilState(userCurrentRankState);
    const [rankValid, setRankValid] = useRecoilState(userCurrentRankValidState);
    const [rankError, setRankError] = useRecoilState(userCurrentRankErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await rankValidator(val);
        setRank(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setRankValid(isValid);
        setRankError(error);
    }

    const rankValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            updateFieldValidation(true, undefined);
            return;
        }
        else {
            if(value.length > 249) {
                updateFieldValidation(false, 'Занадто довга назва звання!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return rankValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return rankError ? rankError : undefined;
    }

    return (
        <Form.Item
            label="Звання"
            name="rank"
            validateStatus={validator()}
            help={validationMessageDispatcher() || ''}
            style={{width: '100%', marginLeft: '15px'}}
        >
            <div
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center'
                }}
                className="space-between"
            >
                <Input
                    name="rank"
                    value={rank}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Звання користувача"
                />
            </div>
        </Form.Item>
    );
}
