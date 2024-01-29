import type { NextPage } from 'next'
import React from "react";
import {Button, Result} from "antd";
import SimpleLayout from "../components/layouts/simpleLayout";

const NotFound: NextPage = () => {
    return (
        <Result
            status="404"
            title="Не знайдено"
            subTitle="Ми шукали дуже довго, але на жаль такої сторінки не існує..."
            extra={<Button type="primary" color="success" href='/'>Додому</Button>}
        />
    )
}


//@ts-ignore
NotFound.getLayout = function getLayout(page: any) {
    return (
        <SimpleLayout>
            {page}
        </SimpleLayout>
    )
}


//@ts-ignore
NotFound.auth = false;
//@ts-ignore
NotFound.admin = false;

export default NotFound
