import React from "react";
import CancelEditProfileButton from "../../../../buttons/profile/edit/cancelButton";
import EditProfileButton from "../../../../buttons/profile/edit/editButton";

export const EditProfileButtonsRowComponent = () => {
    return (
        <div
            style={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
                marginLeft: '20px'
            }}
            className="space-between"
        >
            <CancelEditProfileButton/>
            <EditProfileButton/>
        </div>
    );
};
