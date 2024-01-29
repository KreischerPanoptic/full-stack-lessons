import { useRecoilState } from "recoil";
import React from 'react';
import { rememberState } from "../../../recoil/atoms/login/remember";
import {Form, Checkbox} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";


export const RememberInputComponent = () => {
    const [remember, setRemember] = useRecoilState(rememberState);

    const handleChangeInput = (e: CheckboxChangeEvent) => {
        setRemember(e.target.checked);
    };

    return (
        <Form.Item
            style={{width: '100%'}}
            name="remember"
        >
            <Checkbox
                style={{width: '100%'}}
                checked={remember}
                onChange={handleChangeInput}
            >
                {"Запам'ятати мене?"}
            </Checkbox>
        </Form.Item>
    );
};
