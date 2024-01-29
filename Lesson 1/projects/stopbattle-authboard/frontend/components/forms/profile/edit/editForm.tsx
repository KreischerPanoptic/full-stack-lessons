import React from "react";
import {Form} from "antd";
import {EditProfileUsernameRowComponent} from "../../../rows/profile/edit/simple/usernameRow";
import {EditProfileSelectsRowComponent} from "../../../rows/profile/edit/simple/selectsRow";
import {EditProfileNameSurnameRowComponent} from "../../../rows/profile/edit/advanced/nameSurnameRow";
import {EditProfilePatronymicRowComponent} from "../../../rows/profile/edit/advanced/patronymicRow";
import {EditProfileInfoRowComponent} from "../../../rows/profile/edit/advanced/infoRow";
import {EditProfilePasswordRowComponent} from "../../../rows/profile/edit/simple/passwordRow";

export const EditProfileFormComponent = () => {
    return (
        <Form layout="vertical">
            <fieldset>
                <legend>Основне:</legend>
                <EditProfileUsernameRowComponent/>
                <EditProfilePasswordRowComponent/>
                <EditProfileSelectsRowComponent/>
            </fieldset>
            <fieldset>
                <legend>Додаткова інформація:</legend>
                <EditProfileNameSurnameRowComponent/>
                <EditProfilePatronymicRowComponent/>
                <EditProfileInfoRowComponent/>
            </fieldset>
        </Form>
    );
};
