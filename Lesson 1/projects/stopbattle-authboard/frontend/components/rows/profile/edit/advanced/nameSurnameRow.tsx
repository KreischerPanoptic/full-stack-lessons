import React from "react";
import ProfileFirstNameInput from "../../../../inputs/profile/edit/advanced/firstNameInput";
import ProfileLastNameInput from "../../../../inputs/profile/edit/advanced/lastNameInput";

export const EditProfileNameSurnameRowComponent = () => {
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
            <ProfileFirstNameInput/>
            <ProfileLastNameInput/>
        </div>
    );
};
