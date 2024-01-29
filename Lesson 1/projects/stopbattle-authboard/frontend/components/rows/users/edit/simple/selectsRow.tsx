import React from "react";
import RoleSelect from "../../../../inputs/users/edit/simple/roleSelect";
import RegionSelect from "../../../../inputs/users/edit/simple/regionSelect";

export const EditSelectsRowComponent = () => {
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
            <RoleSelect/>
            <RegionSelect/>
        </div>
    );
};
