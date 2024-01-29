import React from 'react';
import {Card} from "antd";
import {useRecoilValue} from "recoil";
import {FilterRegionFormComponent} from "../../../forms/regions/filter/filterForm";
import {isRegionsLoadingState} from "../../../../recoil/selectors/loaders/pages/regions/loading";

export default function FilterRegionsCard() {
    const isLoading = useRecoilValue(isRegionsLoadingState);

    return (
        <Card loading={isLoading} style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: '20px'}}>
            <FilterRegionFormComponent/>
        </Card>
    );
}
