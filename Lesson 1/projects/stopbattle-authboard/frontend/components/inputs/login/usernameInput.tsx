import { useRecoilState } from "recoil";
import { usernameState } from "../../../recoil/atoms/login/username";
import {Form, Input} from "antd";
import React, {ChangeEvent} from "react";

export const UsernameInputComponent = () => {
    const [username, setUsername] = useRecoilState(usernameState);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    return (
        <Form.Item
            style={{width: '100%'}}
            name="username"
            rules={[
                {required: true, message: 'Введіть логін!'}
            ]}
        >
            <Input
                style={{width: '100%', borderRadius: '10px',}}
                placeholder="Логін"
                value={username}
                onChange={handleChangeInput}
            />
        </Form.Item>
    );
}
