import React from "react";
import ProfilePasswordCheckInput from "../../../../inputs/profile/edit/simple/passwordCheckInput";
import ProfilePasswordInput from "../../../../inputs/profile/edit/simple/passwordInput";
import ProfilePasswordConfirmationInput from "../../../../inputs/profile/edit/simple/passwordConfirmationInput";

export const EditProfilePasswordRowComponent = () => {
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
            <ProfilePasswordCheckInput/>
            <ProfilePasswordInput/>
            <ProfilePasswordConfirmationInput/>
        </div>
    );
};
