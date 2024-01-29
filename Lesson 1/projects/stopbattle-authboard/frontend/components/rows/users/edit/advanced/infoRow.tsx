import React from "react";
import PositionInput from "../../../../inputs/users/edit/advanced/positionInput";
import RankInput from "../../../../inputs/users/edit/advanced/rankInput";

export const EditInfoRowComponent = () => {
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
            <PositionInput/>
            <RankInput/>
        </div>
    );
};
