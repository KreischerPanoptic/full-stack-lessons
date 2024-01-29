import {useRecoilState} from "recoil";
import React, {ChangeEvent} from 'react';
import {Form, Input} from "antd";
import {userCurrentPatronymicState} from "../../../../../recoil/atoms/users/edit/advanced/patronymic/patronymic";
import {userCurrentPatronymicValidState} from "../../../../../recoil/atoms/users/edit/advanced/patronymic/patronymicValid";
import {userCurrentPatronymicErrorState} from "../../../../../recoil/atoms/users/edit/advanced/patronymic/patronymicError";

export default function PatronymicInput() {
    const [patronymic, setPatronymic] = useRecoilState(userCurrentPatronymicState);
    const [patronymicValid, setPatronymicValid] = useRecoilState(userCurrentPatronymicValidState);
    const [patronymicError, setPatronymicError] = useRecoilState(userCurrentPatronymicErrorState);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        await patronymicValidator(val);
        setPatronymic(val);
    };

    const updateFieldValidation = (isValid: boolean, error: string | undefined) => {
        setPatronymicValid(isValid);
        setPatronymicError(error);
    }

    const patronymicValidator = async (value: string | undefined) => {
        if(!value || value.length === 0) {
            updateFieldValidation(true, undefined);
            return;
        }
        else {
            if(!/[А-ЯЇІЄ]{1,1}[а-яїіє]{1,39}/.test(value)) {
                updateFieldValidation(false, 'Невірний формат імені по батькові!');
                return;
            }
            updateFieldValidation(true, undefined);
        }
    };

    const validator = () => {
        return patronymicValid ? 'success' : 'error';
    }

    const validationMessageDispatcher = () => {
        return patronymicError ? patronymicError : undefined;
    }

    return (
        <Form.Item
            label="Ім'я по батькові"
            name="patronymic"
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
                    name="patronymic"
                    value={patronymic}
                    onChange={(value) => {
                        handleChangeInput(value);
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        height: '36px',
                        borderRadius: '10px',
                    }}
                    placeholder="Ім'я по батькові користувача"
                />
            </div>
        </Form.Item>
    );
}
