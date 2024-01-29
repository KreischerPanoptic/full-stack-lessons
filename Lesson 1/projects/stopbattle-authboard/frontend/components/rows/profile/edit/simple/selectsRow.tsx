import React from "react";
import ProfileRoleSelect from "../../../../inputs/profile/edit/simple/roleSelect";
import ProfileRegionSelect from "../../../../inputs/profile/edit/simple/regionSelect";

export const EditProfileSelectsRowComponent = () => {
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
            <ProfileRoleSelect/>
            <ProfileRegionSelect/>
        </div>
    );
};
