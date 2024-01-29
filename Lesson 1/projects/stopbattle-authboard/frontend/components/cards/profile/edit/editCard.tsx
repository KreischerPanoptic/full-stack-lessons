import React from 'react';
import {Card} from "antd";
import {useRecoilValue} from "recoil";
import {isProfileLoadingState} from "../../../../recoil/selectors/loaders/pages/profile/loading";
import {EditProfileFormComponent} from "../../../forms/profile/edit/editForm";
import {EditProfileButtonsRowComponent} from "../../../rows/profile/edit/buttons/buttonsRow";

export default function EditProfileCard() {
    const isLoading = useRecoilValue(isProfileLoadingState);

    return (
        <Card
            title="Редагувати профіль"
            style={{marginTop: '15px', width: '50%', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: '20px', marginBottom: '30px', overflow: 'hidden' }}
            loading={isLoading}
            actions={[
                <EditProfileButtonsRowComponent key={1}/>,
            ]}
        >
            <EditProfileFormComponent/>
        </Card>
    );
}
