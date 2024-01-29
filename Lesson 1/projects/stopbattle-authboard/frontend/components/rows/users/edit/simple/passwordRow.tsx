import React from "react";
import PasswordConfirmationInput from "../../../../inputs/users/edit/simple/passwordConfirmationInput";
import PasswordInput from "../../../../inputs/users/edit/simple/passwordInput";

export const EditPasswordRowComponent = () => {
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
            <PasswordInput/>
            <PasswordConfirmationInput/>
        </div>
    );
};
