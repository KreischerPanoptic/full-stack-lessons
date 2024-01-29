import React from "react";
import StateRegionsSelectInput from "../../../inputs/regions/filter/stateSelect";
import FilterRegionsButton from "../../../buttons/regions/filter/filterButton";
import ClearRegionsButton from "../../../buttons/regions/filter/clearButton";

export const MainRegionFilterRowComponent = () => {
    return (
        <div
            style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center'
            }}
            className="space-between"
        >
            <StateRegionsSelectInput/>
            <FilterRegionsButton/>
            <ClearRegionsButton/>
        </div>
    );
};
