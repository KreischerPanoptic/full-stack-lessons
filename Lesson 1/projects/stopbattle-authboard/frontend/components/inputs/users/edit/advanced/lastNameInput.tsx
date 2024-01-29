import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {userCurrentLastNameState} from "../../../../../recoil/atoms/users/edit/advanced/lastName/lastName";
import {userCurrentLastNameValidState} from "../../../../../recoil/atoms/users/edit/advanced/lastName/lastNameValid";
import {userCurrentLastNameErrorState} from "../../../../../recoil/atoms/users/edit/advanced/lastName/lastNameError";

export default function LastNameInput() {
    const [lastName, setLastName] = useRecoilState(userCurrentLastNameState);
    const [lastNameValid, setLastNameValid] = useRecoilState(userCurrentLastNameValidState);
    const [lastNameError, setLastNameError] = useRecoilState(userCurrentLastNameErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await lastNameValidator(val);
        setLastName(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setLastNameValid(isValid);
        setLastNameError(error);
    }

    const lastNameValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            updateFieldValidation(true, undefined);
            return;
        }
        else {
            if(!/[А-ЯЇІЄ]{1,1}[а-яїіє]{1,34}/.test(value)) {
                updateFieldValidation(false, 'Невірний формат прізвища!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return lastNameValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return lastNameError ? lastNameError : undefined;
    }

    return (
        <Form.Item
            label="Прізвище"
            name="lastName"
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
                    name="lastName"
                    value={lastName}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Прізвище користувача"
                />
            </div>
        </Form.Item>
    );
}
