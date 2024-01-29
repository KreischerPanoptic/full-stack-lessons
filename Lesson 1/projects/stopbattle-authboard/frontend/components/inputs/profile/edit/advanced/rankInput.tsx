import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {profileCurrentRankState} from "../../../../../recoil/atoms/profile/edit/rank/rank";
import {profileCurrentRankValidState} from "../../../../../recoil/atoms/profile/edit/rank/rankValid";
import {profileCurrentRankErrorState} from "../../../../../recoil/atoms/profile/edit/rank/rankError";

export default function ProfileRankInput() {
    const [rank, setRank] = useRecoilState(profileCurrentRankState);
    const [rankValid, setRankValid] = useRecoilState(profileCurrentRankValidState);
    const [rankError, setRankError] = useRecoilState(profileCurrentRankErrorState);

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
