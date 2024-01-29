import React from "react";
import {Form} from "antd";
import {MainRegionFilterRowComponent} from "../../../rows/regions/filter/mainRow";

export const FilterRegionFormComponent = () => {
    return (
        <Form layout="vertical">
            <MainRegionFilterRowComponent/>
        </Form>
    );
};
