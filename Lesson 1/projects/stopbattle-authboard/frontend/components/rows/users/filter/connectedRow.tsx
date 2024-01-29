import React from "react";
import StateSelectInput from "../../../inputs/users/filter/stateSelect";
import RolesSelectInput from "../../../inputs/users/filter/rolesSelect";
import RegionsSelectInput from "../../../inputs/users/filter/regionsSelect";
import FilterUsersButton from "../../../buttons/users/filter/filterButton";

export const ConnectedFilterRowComponent = () => {
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
            <StateSelectInput/>
            <RolesSelectInput/>
            <RegionsSelectInput/>
            <FilterUsersButton/>
        </div>
    );
};
