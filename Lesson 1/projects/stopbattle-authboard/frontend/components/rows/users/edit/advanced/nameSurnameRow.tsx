import React from "react";
import FirstNameInput from "../../../../inputs/users/edit/advanced/firstNameInput";
import LastNameInput from "../../../../inputs/users/edit/advanced/lastNameInput";

export const EditNameSurnameRowComponent = () => {
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
            <FirstNameInput/>
            <LastNameInput/>
        </div>
    );
};
