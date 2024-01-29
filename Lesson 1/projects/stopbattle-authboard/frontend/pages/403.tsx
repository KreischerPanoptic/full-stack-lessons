import type { NextPage } from 'next'
import React from "react";
import {Button, Result} from "antd";
import SimpleLayout from "../components/layouts/simpleLayout";
import {signOut, useSession} from "next-auth/react";

const Unauthorized: NextPage = () => {
    const { data: session, status } = useSession();
    return (
        <Result
            status="403"
            title={`Нам здається, що вам не можна тут бути, ${session?.username}`}
            subTitle={`Нажаль, ця сторінка обмежена для вашого рівня доступу - ${session?.isAdmin ? '"адміністратор"' : '"користувач"'}`}
            extra={[
                <Button type="primary" href={session?.isAdmin ? '/users' : '/404'} color="success" key="home">
                    Додому
                </Button>,
                <Button key="logout" danger onClick={async () => await signOut()}>Перезайти</Button>,
            ]}
        />
    )
}


//@ts-ignore
Unauthorized.getLayout = function getLayout(page: any) {
    return (
        <SimpleLayout>
            {page}
        </SimpleLayout>
    )
}


//@ts-ignore
Unauthorized.auth = true;
//@ts-ignore
Unauthorized.admin = undefined;

export default Unauthorized
