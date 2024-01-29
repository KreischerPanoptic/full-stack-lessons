import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input, message} from "antd";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import {userCurrentUsernameState} from "../../../../recoil/atoms/users/edit/simple/username/username";
import {userCurrentUsernameValidState} from "../../../../recoil/atoms/users/edit/simple/username/usernameValid";
import {userCurrentUsernameErrorState} from "../../../../recoil/atoms/users/edit/simple/username/usernameError";
import ValidationUsernameModelRequest from "../../../../models/requests/validate/validationUsername.model";
import {regionCurrentNameState} from "../../../../recoil/atoms/regions/edit/name/name";
import {regionCurrentNameValidState} from "../../../../recoil/atoms/regions/edit/name/nameValid";
import {regionCurrentNameErrorState} from "../../../../recoil/atoms/regions/edit/name/nameError";
import ValidationRegionExistsModelRequest from "../../../../models/requests/validate/validationRegionExists.model";

export default function NameInput() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const [name, setName] = useRecoilState(regionCurrentNameState);
    const [nameValid, setNameValid] = useRecoilState(regionCurrentNameValidState);
    const [nameError, setNameError] = useRecoilState(regionCurrentNameErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await nameValidator(val);
        await setName(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setNameValid(isValid);
        setNameError(error);
    }

    const nameValidator = async (value: string | undefined) => {
        if(!value || value.length < 3) {
            updateFieldValidation(false, 'Вкажіть назву регіону!');
            return;
        }
        else {
            if(value.length > 149) {
                updateFieldValidation(false, 'Занадто довга назва регіону!');
                return;
            }

            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return nameValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return nameError ? nameError : undefined;
    }

    return (
        <Form.Item
            label="Назва"
            name="name"
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
                    name="name"
                    value={name}
                    onChange={handleChangeInput}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Назва регіону"
                />
            </div>
        </Form.Item>
    );
}
