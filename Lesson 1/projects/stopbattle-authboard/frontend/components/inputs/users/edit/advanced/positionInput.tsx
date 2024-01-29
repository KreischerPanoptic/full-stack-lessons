import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {userCurrentPositionState} from "../../../../../recoil/atoms/users/edit/advanced/position/position";
import {userCurrentPositionValidState} from "../../../../../recoil/atoms/users/edit/advanced/position/positionValid";
import {userCurrentPositionErrorState} from "../../../../../recoil/atoms/users/edit/advanced/position/positionError";

export default function PositionInput() {
    const [position, setPosition] = useRecoilState(userCurrentPositionState);
    const [positionValid, setPositionValid] = useRecoilState(userCurrentPositionValidState);
    const [positionError, setPositionError] = useRecoilState(userCurrentPositionErrorState);

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
