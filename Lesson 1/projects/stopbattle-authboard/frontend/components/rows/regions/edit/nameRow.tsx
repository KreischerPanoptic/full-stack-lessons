import React from "react";
import NameInput from "../../../inputs/regions/edit/nameInput";

export const EditNameRowComponent = () => {
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
            <NameInput/>
        </div>
    );
};
