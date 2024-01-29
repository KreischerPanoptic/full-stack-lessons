import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, message} from "antd";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../../recoil/atoms/shared/error/error";
import {userCurrentPasswordState} from "../../../../../recoil/atoms/users/edit/simple/password/password";
import {userCurrentPasswordValidState} from "../../../../../recoil/atoms/users/edit/simple/password/passwordValid";
import {userCurrentPasswordErrorState} from "../../../../../recoil/atoms/users/edit/simple/password/passwordError";
import ValidationPasswordModelRequest from "../../../../../models/requests/validate/validationPassword.model";
import {userCurrentIdValueState} from "../../../../../recoil/selectors/users/edit/simple/id/id";

export default function PasswordInput() {
    const { data: session } = useSession();

    const id = useRecoilValue(userCurrentIdValueState);
    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [password, setPassword] = useRecoilState(userCurrentPasswordState);
    const [passwordValid, setPasswordValid] = useRecoilState(userCurrentPasswordValidState);
    const [passwordError, setPasswordError] = useRecoilState(userCurrentPasswordErrorState);

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
            label="Пароль"
            name="password"
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
                    placeholder="Пароль користувача"
                />
            </div>
        </Form.Item>
    );
}
