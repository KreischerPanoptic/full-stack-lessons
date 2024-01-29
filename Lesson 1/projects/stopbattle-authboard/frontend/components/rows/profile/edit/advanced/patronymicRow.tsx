import React from "react";
import ProfilePatronymicInput from "../../../../inputs/profile/edit/advanced/patronymicInput";

export const EditProfilePatronymicRowComponent = () => {
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
            <ProfilePatronymicInput/>
        </div>
    );
};
