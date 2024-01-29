import React from "react";
import PatronymicInput from "../../../../inputs/users/edit/advanced/patronymicInput";

export const EditPatronymicRowComponent = () => {
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
            <PatronymicInput/>
        </div>
    );
};
