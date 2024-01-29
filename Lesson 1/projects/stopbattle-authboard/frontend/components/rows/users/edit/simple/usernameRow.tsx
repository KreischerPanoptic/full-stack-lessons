import React from "react";
import UsernameInput from "../../../../inputs/users/edit/simple/usernameInput";

export const EditUsernameRowComponent = () => {
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
            <UsernameInput/>
        </div>
    );
};
