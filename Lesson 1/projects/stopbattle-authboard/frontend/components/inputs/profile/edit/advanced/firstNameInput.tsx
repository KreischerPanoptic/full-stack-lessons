import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {profileCurrentFirstNameState} from "../../../../../recoil/atoms/profile/edit/firstName/firstName";
import {profileCurrentFirstNameValidState} from "../../../../../recoil/atoms/profile/edit/firstName/firstNameValid";
import {profileCurrentFirstNameErrorState} from "../../../../../recoil/atoms/profile/edit/firstName/firstNameError";

export default function ProfileFirstNameInput() {
    const [firstName, setFirstName] = useRecoilState(profileCurrentFirstNameState);
    const [firstNameValid, setFirstNameValid] = useRecoilState(profileCurrentFirstNameValidState);
    const [firstNameError, setFirstNameError] = useRecoilState(profileCurrentFirstNameErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await firstNameValidator(val);
        setFirstName(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setFirstNameValid(isValid);
        setFirstNameError(error);
    }

    const firstNameValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            updateFieldValidation(true, undefined);
            return;
        }
        else {
            if(!/[А-ЯЇІЄ]{1,1}[а-яїіє]{1,20}/.test(value)) {
                updateFieldValidation(false, 'Невірний формат імені!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return firstNameValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return firstNameError ? firstNameError : undefined;
    }

    return (
        <Form.Item
            label="Ім'я"
            name="firstName"
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
                    name="firstName"
                    value={firstName}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Ім'я користувача"
                />
            </div>
        </Form.Item>
    );
}