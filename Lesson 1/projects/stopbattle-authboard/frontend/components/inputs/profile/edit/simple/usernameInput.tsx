import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, message} from "antd";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../../recoil/atoms/shared/error/error";
import ValidationUsernameModelRequest from "../../../../../models/requests/validate/validationUsername.model";
import {profileCurrentUsernameState} from "../../../../../recoil/atoms/profile/edit/username/username";
import {profileCurrentUsernameValidState} from "../../../../../recoil/atoms/profile/edit/username/usernameValid";
import {profileCurrentUsernameErrorState} from "../../../../../recoil/atoms/profile/edit/username/usernameError";

export default function ProfileUsernameInput() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [username, setUsername] = useRecoilState(profileCurrentUsernameState);
    const [usernameValid, setUsernameValid] = useRecoilState(profileCurrentUsernameValidState);
    const [usernameError, setUsernameError] = useRecoilState(profileCurrentUsernameErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await setUsername(val);
    };

    const handleOnBlur = async () => {
        await usernameValidator(username);
    }

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setUsernameValid(isValid);
        setUsernameError(error);
    }

    const isValidUsername = async (value: string): Promise<boolean> => {
        resetNetworkErrorState();
        let request = new ValidationUsernameModelRequest()
        request.username = value;

        return await axios.create().post('/api/validate/users/unique/username', request, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
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

    const usernameValidator = async (value: string | undefined) => {
        if(!value || value.length < 3) {
            updateFieldValidation(false, 'Вкажіть логін!');
            return;
        }
        else {
            if(!/^(?=[a-zA-Z0-9._-]{3,30}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$/.test(value)) {
                updateFieldValidation(false, 'Невірний формат логіну!');
                return;
            }

            if(!await isValidUsername(value)) {
                updateFieldValidation(false, 'Такий логін вже існує!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return usernameValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return usernameError ? usernameError : undefined;
    }

    return (
        <Form.Item
            label="Логін"
            name="username"
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
                    disabled
                    name="username"
                    value={username}
                    onChange={handleChangeInput}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    onBlur={handleOnBlur}
                    placeholder="Логін користувача"
                />
            </div>
        </Form.Item>
    );
}
