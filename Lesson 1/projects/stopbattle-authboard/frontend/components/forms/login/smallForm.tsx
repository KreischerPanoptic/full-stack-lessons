import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import React from 'react';
import { usernameValueState } from "../../../recoil/selectors/login/username";
import { passwordValueState } from "../../../recoil/selectors/login/password";
import { rememberOnOffState } from "../../../recoil/selectors/login/remember";
import {Button, Form, Spin} from "antd";
import {UsernameInputComponent} from "../../inputs/login/usernameInput";
import {PasswordInputComponent} from "../../inputs/login/passwordInput";
import {RememberInputComponent} from "../../inputs/login/rememberInput";
import {useSession, signIn } from "next-auth/react"
import {isLoginErrorState} from "../../../recoil/selectors/login/isError";
import {loginErrorValueState} from "../../../recoil/selectors/login/error";
import {loginErrorState} from "../../../recoil/atoms/login/error";
import {passwordState} from "../../../recoil/atoms/login/password";
import {usernameState} from "../../../recoil/atoms/login/username";
import {rememberState} from "../../../recoil/atoms/login/remember";
import {AUTH_URL, MANAGMENT_URL} from "../../../config/config";
import {loginLoadingState} from "../../../recoil/atoms/loaders/pages/login/loading";
import {useRouter} from "next/router";
import {isLoginLoadingState} from "../../../recoil/selectors/loaders/pages/login/loading";
import publicIp from "public-ip";
import {ipState} from "../../../recoil/atoms/shared/ip/ip";
import {totpCodeValueState} from "../../../recoil/selectors/login/code";
import {totpEnabledState} from "../../../recoil/atoms/login/totpEnabled";
import {totpCodeState} from "../../../recoil/atoms/login/code";
import {CodeInputComponent} from "../../inputs/login/codeInput";

// @ts-ignore
export default function SmallLoginForm() {
    const {data: session} = useSession();
    const router = useRouter();

    const username = useRecoilValue(usernameValueState);
    const password = useRecoilValue(passwordValueState);
    const remember = useRecoilValue(rememberOnOffState);
    const code = useRecoilValue(totpCodeValueState);

    const isError = useRecoilValue(isLoginErrorState);
    const isLoggingIn = useRecoilValue(isLoginLoadingState);
    const errorMessage = useRecoilValue(loginErrorValueState);

    const [, setErrorRawState] = useRecoilState(loginErrorState);
    const [, setIsLoggingIn] = useRecoilState(loginLoadingState);
    const [ip, setIP] = useRecoilState(ipState);
    const [totpEnabled, setTotpEnabled] = useRecoilState(totpEnabledState);

    const resetErrorState = useResetRecoilState(loginErrorState);
    const resetUsernameState = useResetRecoilState(usernameState);
    const resetPasswordState = useResetRecoilState(passwordState);
    const resetRememberState = useResetRecoilState(rememberState);
    const resetTOTPCodeState = useResetRecoilState(totpCodeState);
    const resetTOTPEnabledState = useResetRecoilState(totpEnabledState);

    const login = async () => {
        let {callbackUrl} = router.query;
        setIsLoggingIn(true);
        resetErrorState();

        let currentIP = await publicIp.v4();
        if(!ip || ip !== currentIP) {
            setIP(currentIP);
        }

        let callback = callbackUrl ? typeof callbackUrl === 'string' ? `${callbackUrl}` : callbackUrl[0] : AUTH_URL

        let response = await signIn('auth', {
            redirect: false,
            username: username,
            password: password,
            rememberMe: remember,
            code: code,
            ip: currentIP,
            callbackUrl: callback
        }).then((respons: any ) => {
            return respons;
        })

        if(!response) {
            resetErrorState();
            resetPasswordState();
            resetUsernameState();
            resetRememberState();
            resetTOTPCodeState();
            resetTOTPEnabledState();
        }
        else {
            if (response.error) {
                if(response.error === '2fa_code_required') {
                    setTotpEnabled(true);
                }
                else {
                    setErrorRawState(response.error);
                }
            }
            else {
                resetErrorState();
                resetPasswordState();
                resetUsernameState();
                resetRememberState();
                resetTOTPCodeState();
                resetTOTPEnabledState();
                setIsLoggingIn(false);
                window.location.replace(response.url)
            }
        }
        setIsLoggingIn(false);
    }

    return (
        <Spin spinning={isLoggingIn} style={{marginTop: '15px'}}>
            <Form
                name="login"
                layout='vertical'
                autoComplete="off"
                onFinish={async () => {
                    await login()
                }}
            >
                <div
                    style={
                        {
                            color: 'red',
                            display: `${isError ? 'block': 'none'}`,
                            marginBottom: '15px',
                            borderBlockColor: 'red',
                            border: 'dotted',
                            borderRadius: '15px',
                            borderWidth: '2px'
                        }
                    }>
                    {errorMessage}
                </div>
                {
                    totpEnabled ?
                        <CodeInputComponent/>
                        :
                        <React.Fragment>
                            <UsernameInputComponent/>
                            <PasswordInputComponent/>
                            <RememberInputComponent/>
                        </React.Fragment>
                }

                {
                    totpEnabled ?
                        <div
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            className="space-between"
                        >
                            <Form.Item
                                style={{width: '100%'}}
                            >
                                <Button
                                    htmlType='submit'
                                    type="default"
                                    style={{background: '#2f579b', borderRadius: '5px', color: '#FFFFFF', width: '100%'}}
                                >
                                    Перевірити код
                                </Button>
                            </Form.Item>
                        </div>
                        :
                        <Form.Item
                            style={{width: '100%'}}
                        >
                            <Button
                                htmlType='submit'
                                type="default"
                                style={{background: '#8A8A8A', borderRadius: '5px', width: '50%', color: '#FFFFFF'}}
                            >
                                Увійти
                            </Button>
                        </Form.Item>
                }
            </Form>
        </Spin>
    );
}
