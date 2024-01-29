import {useRecoilState, useRecoilValue} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, Select} from "antd";
import {profileCurrentPasswordValueState} from "../../../../../recoil/selectors/profile/edit/password/password";
import {profileCurrentIdValueState} from "../../../../../recoil/selectors/profile/edit/id/id";
import {profileCurrentPasswordConfirmationState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentPasswordConfirmationValidState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationValid";
import {profileCurrentPasswordConfirmationErrorState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationError";
import {profileCurrentPasswordCheckValueState} from "../../../../../recoil/selectors/profile/edit/passwordCheck/passwordCheck";

export default function ProfilePasswordConfirmationInput() {
    const id = useRecoilValue(profileCurrentIdValueState);
    const [passwordConfirmation, setPasswordConfirmation] = useRecoilState(profileCurrentPasswordConfirmationState)
    const [passwordValid, setPasswordValid] = useRecoilState(profileCurrentPasswordConfirmationValidState);
    const [passwordError, setPasswordError] = useRecoilState(profileCurrentPasswordConfirmationErrorState);

    const password = useRecoilValue(profileCurrentPasswordValueState);
    const passwordCheck = useRecoilValue(profileCurrentPasswordCheckValueState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await passwordValidator(val);
        setPasswordConfirmation(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setPasswordValid(isValid);
        setPasswordError(error);
    }

    const passwordValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            if(id > 0){
                if((passwordCheck && passwordCheck.length > 0) || (password && password.length > 0)) {
                    updateFieldValidation(false, 'Підтвердіть пароль!');
                    return;
                }
                updateFieldValidation(true, undefined);
                return;
            }
            updateFieldValidation(false, 'Підтвердіть пароль!');
            return;
        }
        else {
            if(value !== password) {
                updateFieldValidation(false, 'Підтвердження пароля та пароль не збігаються!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return passwordValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return passwordError ? passwordError : undefined;
    }

    return (
        <Form.Item
            label="Підтвердження нового пароля"
            name="passwordConfirmation"
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
                <Input.Password
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Підтвердіть новий пароль користувача"
                />
            </div>
        </Form.Item>
    );
}
