import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {profileCurrentLastNameState} from "../../../../../recoil/atoms/profile/edit/lastName/lastName";
import {profileCurrentLastNameValidState} from "../../../../../recoil/atoms/profile/edit/lastName/lastNameValid";
import {profileCurrentLastNameErrorState} from "../../../../../recoil/atoms/profile/edit/lastName/lastNameError";

export default function ProfileLastNameInput() {
    const [lastName, setLastName] = useRecoilState(profileCurrentLastNameState);
    const [lastNameValid, setLastNameValid] = useRecoilState(profileCurrentLastNameValidState);
    const [lastNameError, setLastNameError] = useRecoilState(profileCurrentLastNameErrorState);

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
