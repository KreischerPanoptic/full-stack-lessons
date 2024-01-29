import React from 'react';
import {Card} from "antd";
import {FilterFormComponent} from "../../../forms/users/filter/filterForm";
import {useRecoilValue} from "recoil";
import {isUsersLoadingState} from "../../../../recoil/selectors/loaders/pages/users/loading";

export default function FilterUsersCard() {
    const isLoading = useRecoilValue(isUsersLoadingState);

    return (
        <Card loading={isLoading} style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: '20px'}}>
            <FilterFormComponent/>
        </Card>
    );
}
