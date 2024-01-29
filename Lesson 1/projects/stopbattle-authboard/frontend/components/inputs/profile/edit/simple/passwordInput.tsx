import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, message} from "antd";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../../recoil/atoms/shared/error/error";
import ValidationPasswordModelRequest from "../../../../../models/requests/validate/validationPassword.model";
import {profileCurrentPasswordState} from "../../../../../recoil/atoms/profile/edit/password/password";
import {profileCurrentPasswordValidState} from "../../../../../recoil/atoms/profile/edit/password/passwordValid";
import {profileCurrentPasswordErrorState} from "../../../../../recoil/atoms/profile/edit/password/passwordError";
import {profileCurrentIdValueState} from "../../../../../recoil/selectors/profile/edit/id/id";
import {profileCurrentPasswordConfirmationValueState} from "../../../../../recoil/selectors/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentPasswordCheckValueState} from "../../../../../recoil/selectors/profile/edit/passwordCheck/passwordCheck";

export default function ProfilePasswordInput() {
    const { data: session } = useSession();

    const id = useRecoilValue(profileCurrentIdValueState);
    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [password, setPassword] = useRecoilState(profileCurrentPasswordState);
    const [passwordValid, setPasswordValid] = useRecoilState(profileCurrentPasswordValidState);
    const [passwordError, setPasswordError] = useRecoilState(profileCurrentPasswordErrorState);

    const passwordConfirm = useRecoilValue(profileCurrentPasswordConfirmationValueState);
    const passwordCheck = useRecoilValue(profileCurrentPasswordCheckValueState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        setPassword(val);
    };

    const handleOnBlur = async () => {
        await passwordValidator(password);
    }

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setPasswordValid(isValid);
        setPasswordError(error);
    }

    const isSatisfyPassword = async (value: string): Promise<boolean> => {
        resetNetworkErrorState();
        let request = new ValidationPasswordModelRequest()
        request.password = value;

        return await axios.create().post('/api/validate/users/password/is_passing', request, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    return response.data.passed;
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
                return false;
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
                return false;
            })
    }

    const isStrongPassword = async (value: string): Promise<boolean> => {
        resetNetworkErrorState();
        let request = new ValidationPasswordModelRequest()
        request.password = value;

        return await axios.create().post('/api/validate/users/password/is_strong', request, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    return response.data.passed;
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
                return false;
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
                return false;
            })
    }

    const passwordValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            if(id > 0){
                if((passwordCheck && passwordCheck.length > 0) || (passwordConfirm && passwordConfirm.length > 0)) {
                    updateFieldValidation(false, 'Встановіть пароль!');
                    return;
                }
                updateFieldValidation(true, undefined);
                return;
            }
            updateFieldValidation(false, 'Встановіть пароль!');
            return;
        }
        else {
            if(!/[a-zA-Z0-9~`!@#$%^&*()_\-+={}[\]|\\\/;:'?.,><]{8,120}/.test(value)) {
                updateFieldValidation(false, 'Невірний формат пароля!');
                return;
            }

            if(!await isSatisfyPassword(value)) {
                updateFieldValidation(false, 'Пароль не задовільняє вимогам безпеки!');
                return;
            }

            if(!await isStrongPassword(value)) {
                updateFieldValidation(false, 'Пароль не проходить автоматизовані тести безпеки!');
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
            label="Новий пароль"
            name="password"
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
                    name="password"
                    value={password}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    onBlur={handleOnBlur}
                    placeholder="Новий пароль користувача"
                />
            </div>
        </Form.Item>
    );
}
