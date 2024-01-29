import React from "react";
import {Form} from "antd";
import {ConnectedFilterRowComponent} from "../../../rows/users/filter/connectedRow";
import {MainFilterRowComponent} from "../../../rows/users/filter/mainRow";

export const FilterFormComponent = () => {
    return (
        <Form layout="vertical">
            <ConnectedFilterRowComponent/>
            <MainFilterRowComponent/>
        </Form>
    );
};
