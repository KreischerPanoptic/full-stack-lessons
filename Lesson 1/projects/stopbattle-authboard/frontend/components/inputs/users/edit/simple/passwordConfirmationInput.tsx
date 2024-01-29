import {useRecoilState, useRecoilValue} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, Select} from "antd";
import {userCurrentPasswordConfirmationState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {userCurrentPasswordConfirmationValidState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {userCurrentPasswordConfirmationErrorState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationError";
import {userCurrentPasswordValueState} from "../../../../../recoil/selectors/users/edit/simple/password/password";
import {userCurrentIdValueState} from "../../../../../recoil/selectors/users/edit/simple/id/id";

export default function PasswordConfirmationInput() {
    const password = useRecoilValue(userCurrentPasswordValueState);

    const id = useRecoilValue(userCurrentIdValueState);
    const [passwordConfirmation, setPasswordConfirmation] = useRecoilState(userCurrentPasswordConfirmationState)
    const [passwordValid, setPasswordValid] = useRecoilState(userCurrentPasswordConfirmationValidState);
    const [passwordError, setPasswordError] = useRecoilState(userCurrentPasswordConfirmationErrorState);

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
            label="Підтвердження пароля"
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
                    placeholder="Підтвердіть пароль користувача"
                />
            </div>
        </Form.Item>
    );
}
