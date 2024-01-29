import { useRecoilState } from "recoil";
import { totpCodeState } from "../../../recoil/atoms/login/code";
import {Form} from "antd";
import React from "react";
import OtpInput from "react-otp-input";

export const CodeInputComponent = () => {
    const [code, setCode] = useRecoilState(totpCodeState);

    const handleChangeInput = (otp: any) => {
        setCode(otp);
    };

    return (
        <Form.Item
            style={{width: '100%', marginBottom: '15px'}}
            label='2FA Код'
            labelCol={{span: 6, offset: 9}}
            name="codet"
            rules={[
                {required: true, message: 'Введіть 2FA код!'}
            ]}
            trigger='onChange'
        >
            <OtpInput
                containerStyle={{justifyContent: 'center'}}
                inputStyle={{
                    width: '2.4em',
                    height: '3em',
                    boxSizing: 'border-box',
                    margin: 0,
                    fontVariant: 'tabular-nums',
                    listStyle: 'none',
                    fontFeatureSettings: `'tnum', "tnum"`,
                    position: 'relative',
                    display: 'inline-block',
                    minWidth: '2.5em',
                    padding: '4px 11px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    fontSize: '14px',
                    lineHeight: '1.5715',
                    backgroundColor: '#fff',
                    backgroundImage: 'none',
                    border: "1px solid #d9d9d9",
                    borderTopColor: 'rgb(217, 217, 217)',
                    borderRightColor: 'rgb(217, 217, 217)',
                    borderBottomColor: 'rgb(217, 217, 217)',
                    borderLeftColor: 'rgb(217, 217, 217)',
                    borderRadius: '2px',
                    transition: 'all 0.3s'}}
                value={code}
                isInputNum
                shouldAutoFocus={true}
                onChange={handleChangeInput}
                numInputs={6}
                separator={<span style={{marginLeft: '5px', marginRight: '5px'}}>.</span>}
            />
        </Form.Item>
    );
};
