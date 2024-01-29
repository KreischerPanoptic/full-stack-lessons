import React from "react";
import ProfileUsernameInput from "../../../../inputs/profile/edit/simple/usernameInput";

export const EditProfileUsernameRowComponent = () => {
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
            <ProfileUsernameInput/>
        </div>
    );
};
