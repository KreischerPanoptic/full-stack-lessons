import { useRecoilState } from "recoil";
import { passwordState } from "../../../recoil/atoms/login/password";
import {Form, Input} from "antd";
import React, {ChangeEvent} from "react";

export const PasswordInputComponent = () => {
    const [password, setPassword] = useRecoilState(passwordState);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <Form.Item
            style={{width: '100%'}}
            name="password"
            rules={[
                {required: true, message: 'Введіть пароль!'}
            ]}
        >
            <Input.Password
                style={{width: '100%',borderRadius: '10px',}}
                placeholder="Пароль"
                value={password}
                onChange={handleChangeInput}
            />
        </Form.Item>
    );
};
