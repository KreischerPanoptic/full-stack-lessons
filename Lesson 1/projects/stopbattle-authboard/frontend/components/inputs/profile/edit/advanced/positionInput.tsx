import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {profileCurrentPositionState} from "../../../../../recoil/atoms/profile/edit/position/position";
import {profileCurrentPositionValidState} from "../../../../../recoil/atoms/profile/edit/position/positionValid";
import {profileCurrentPositionErrorState} from "../../../../../recoil/atoms/profile/edit/position/positionError";

export default function ProfilePositionInput() {
    const [position, setPosition] = useRecoilState(profileCurrentPositionState);
    const [positionValid, setPositionValid] = useRecoilState(profileCurrentPositionValidState);
    const [positionError, setPositionError] = useRecoilState(profileCurrentPositionErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await positionValidator(val);
        setPosition(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setPositionValid(isValid);
        setPositionError(error);
    }

    const positionValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            updateFieldValidation(true, undefined);
            return;
        }
        else {
            if(value.length > 249) {
                updateFieldValidation(false, 'Занадто довга назва посади!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return positionValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return positionError ? positionError : undefined;
    }

    return (
        <Form.Item
            label="Посада"
            name="position"
            validateStatus={validator()}
            help={validationMessageDispatcher() || ''}
            style={{width: '100%'}}
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
                    name="position"
                    value={position}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Посада користувача"
                />
            </div>
        </Form.Item>
    );
}
