import React from "react";

import FirstNamesSelectInput from "../../../inputs/users/filter/firstNameSelect";
import LastNamesSelectInput from "../../../inputs/users/filter/lastNameSelect";
import UsernamesSelectInput from "../../../inputs/users/filter/usernamesSelect";
import ClearUsersButton from "../../../buttons/users/filter/clearButton";

export const MainFilterRowComponent = () => {
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
            <UsernamesSelectInput/>
            <FirstNamesSelectInput/>
            <LastNamesSelectInput/>
            <ClearUsersButton/>
        </div>
    );
};
