import React from "react";
import {Form} from "antd";
import {EditUsernameRowComponent} from "../../../rows/users/edit/simple/usernameRow";
import {EditPasswordRowComponent} from "../../../rows/users/edit/simple/passwordRow";
import {EditSelectsRowComponent} from "../../../rows/users/edit/simple/selectsRow";
import {EditNameSurnameRowComponent} from "../../../rows/users/edit/advanced/nameSurnameRow";
import {EditPatronymicRowComponent} from "../../../rows/users/edit/advanced/patronymicRow";
import {EditInfoRowComponent} from "../../../rows/users/edit/advanced/infoRow";

export const EditFormComponent = () => {
    return (
        <Form layout="vertical">
            <fieldset>
                <legend>Основне:</legend>
                <EditUsernameRowComponent/>
                <EditPasswordRowComponent/>
                <EditSelectsRowComponent/>
            </fieldset>
            <fieldset>
                <legend>Додаткова інформація:</legend>
                <EditNameSurnameRowComponent/>
                <EditPatronymicRowComponent/>
                <EditInfoRowComponent/>
            </fieldset>
        </Form>
    );
};
