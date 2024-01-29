import React from "react";
import {Form} from "antd";
import {EditNameRowComponent} from "../../../rows/regions/edit/nameRow";

export const EditRegionFormComponent = () => {
    return (
        <Form layout="vertical">
            <EditNameRowComponent/>
        </Form>
    );
};
