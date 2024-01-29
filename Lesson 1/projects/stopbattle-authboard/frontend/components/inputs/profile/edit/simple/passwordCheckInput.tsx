import {useRecoilState, useRecoilValue} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, Select} from "antd";
import {userCurrentPasswordConfirmationState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {userCurrentPasswordConfirmationValidState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {userCurrentPasswordConfirmationErrorState} from "../../../../../recoil/atoms/users/edit/simple/passwordConfirmation/passwordConfirmationError";
import {userCurrentPasswordValueState} from "../../../../../recoil/selectors/users/edit/simple/password/password";
import {userCurrentIdValueState} from "../../../../../recoil/selectors/users/edit/simple/id/id";
import {profileCurrentPasswordValueState} from "../../../../../recoil/selectors/profile/edit/password/password";
import {profileCurrentIdValueState} from "../../../../../recoil/selectors/profile/edit/id/id";
import {profileCurrentPasswordConfirmationState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentPasswordConfirmationValidState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationValid";
import {profileCurrentPasswordConfirmationErrorState} from "../../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationError";
import {profileCurrentPasswordCheckState} from "../../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheck";
import {profileCurrentPasswordCheckValidState} from "../../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheckValid";
import {profileCurrentPasswordCheckErrorState} from "../../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheckError";
import {profileCurrentPasswordConfirmationValueState} from "../../../../../recoil/selectors/profile/edit/passwordConfirmation/passwordConfirmation";

export default function ProfilePasswordCheckInput() {
    const id = useRecoilValue(profileCurrentIdValueState);
    const [passwordCheck, setPasswordCheck] = useRecoilState(profileCurrentPasswordCheckState)
    const [passwordValid, setPasswordValid] = useRecoilState(profileCurrentPasswordCheckValidState);
    const [passwordError, setPasswordError] = useRecoilState(profileCurrentPasswordCheckErrorState);

    const password = useRecoilValue(profileCurrentPasswordValueState);
    const passwordConfirm = useRecoilValue(profileCurrentPasswordConfirmationValueState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await passwordValidator(val);
        setPasswordCheck(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setPasswordValid(isValid);
        setPasswordError(error);
    }

    const passwordValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            if(id > 0){
                if((password && password.length > 0) || (passwordConfirm && passwordConfirm.length > 0)) {
                    updateFieldValidation(false, 'Ведіть поточний пароль!');
                    return;
                }
                updateFieldValidation(true, undefined);
                return;
            }
            updateFieldValidation(false, 'Ведіть поточний пароль!');
            return;
        }
        else {
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
            label="Поточний пароль"
            name="passwordCheck"
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
                <Input.Password
                    name="passwordCheck"
                    value={passwordCheck}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Поточний пароль користувача"
                />
            </div>
        </Form.Item>
    );
}
