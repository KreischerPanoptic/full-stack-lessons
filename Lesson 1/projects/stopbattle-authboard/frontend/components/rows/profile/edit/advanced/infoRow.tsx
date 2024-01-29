import React from "react";
import ProfilePositionInput from "../../../../inputs/profile/edit/advanced/positionInput";
import ProfileRankInput from "../../../../inputs/profile/edit/advanced/rankInput";

export const EditProfileInfoRowComponent = () => {
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
            <ProfilePositionInput/>
            <ProfileRankInput/>
        </div>
    );
};
