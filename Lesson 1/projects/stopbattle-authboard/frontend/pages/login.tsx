import type { NextPage } from 'next'
import React, {useEffect, useState} from "react";
import SmallLoginForm from "../components/forms/login/smallForm";
import LargeLoginForm from "../components/forms/login/largeForm";
import {Card} from "antd";

const Login: NextPage = () => {
    return (
        <Card
            title='Увійти'
            style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: '20px'}}
        >
            {// @ts-ignore
      useWindowSize().width < 500 ?
              <SmallLoginForm />:
              <LargeLoginForm />}
        </Card>
  )
}

//@ts-ignore
Login.auth = false;
//@ts-ignore
Login.admin = false;

export default Login

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            function handleResize() {
                setWindowSize({
                    // @ts-ignore
                    width: window.innerWidth,
                    // @ts-ignore
                    height: window.innerHeight,
                });
            }

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    return windowSize;
}
