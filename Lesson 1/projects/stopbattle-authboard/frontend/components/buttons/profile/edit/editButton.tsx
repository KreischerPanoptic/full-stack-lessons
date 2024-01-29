import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import React, {useEffect} from 'react';
import Button from "antd-button-color";
import {Form, message} from "antd";
import FilterUsersModelRequest from "../../../../models/requests/users/filterUsers.model";
import FilterParamsModel from "../../../../models/requests/users/filterParams.model";
import axios from "axios";
import {useSession} from "next-auth/react";
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
import UserModelResponse from "../../../../models/responses/users/user.model";
import UserItemModel from "../../../../models/views/users/userItem.model";
import {regionsGetModeState} from "../../../../recoil/atoms/regions/table/mode/getMode";
import {regionsItemsState} from "../../../../recoil/atoms/regions/table/items/items";
import {regionsRowsState} from "../../../../recoil/atoms/regions/table/rows/rows";
import {regionsCountState} from "../../../../recoil/atoms/regions/table/count/count";
import {regionsCurrentPageState} from "../../../../recoil/atoms/regions/table/page/page";
import {regionsAmountState} from "../../../../recoil/atoms/regions/table/amount/amount";
import {regionsLoadingState} from "../../../../recoil/atoms/loaders/pages/regions/loading";
import {regionsFilterArchivedValueState} from "../../../../recoil/selectors/regions/filter/archived/archived";
import {regionsFilterActiveValueState} from "../../../../recoil/selectors/regions/filter/active/active";
import GetRegionsModelRequest from "../../../../models/requests/regions/getRegions.model";
import RegionModelResponse from "../../../../models/responses/regions/region.model";
import RegionItemModel from "../../../../models/views/regions/regionItem.model";
import {profileCurrentIdState} from "../../../../recoil/atoms/profile/edit/id/id";
import {profileCurrentUsernameState} from "../../../../recoil/atoms/profile/edit/username/username";
import {profileCurrentPasswordState} from "../../../../recoil/atoms/profile/edit/password/password";
import {profileCurrentPasswordConfirmationState} from "../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentPasswordCheckState} from "../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheck";
import {profileCurrentRoleSelectedState} from "../../../../recoil/atoms/profile/edit/role/role";
import {profileCurrentRegionSelectedState} from "../../../../recoil/atoms/profile/edit/region/region";
import {profileCurrentFirstNameState} from "../../../../recoil/atoms/profile/edit/firstName/firstName";
import {profileCurrentLastNameState} from "../../../../recoil/atoms/profile/edit/lastName/lastName";
import {profileCurrentPatronymicState} from "../../../../recoil/atoms/profile/edit/patronymic/patronymic";
import {profileCurrentPositionState} from "../../../../recoil/atoms/profile/edit/position/position";
import {profileCurrentRankState} from "../../../../recoil/atoms/profile/edit/rank/rank";
import {profileCurrentUsernameValidState} from "../../../../recoil/atoms/profile/edit/username/usernameValid";
import {profileCurrentPasswordValidState} from "../../../../recoil/atoms/profile/edit/password/passwordValid";
import {profileCurrentPasswordConfirmationValidState} from "../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationValid";
import {profileCurrentPasswordCheckValidState} from "../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheckValid";
import {profileCurrentFirstNameValidState} from "../../../../recoil/atoms/profile/edit/firstName/firstNameValid";
import {profileCurrentLastNameValidState} from "../../../../recoil/atoms/profile/edit/lastName/lastNameValid";
import {profileCurrentPatronymicValidState} from "../../../../recoil/atoms/profile/edit/patronymic/patronymicValid";
import {profileCurrentPositionValidState} from "../../../../recoil/atoms/profile/edit/position/positionValid";
import {profileCurrentRankValidState} from "../../../../recoil/atoms/profile/edit/rank/rankValid";
import {profileCurrentUsernameErrorState} from "../../../../recoil/atoms/profile/edit/username/usernameError";
import {profileCurrentPasswordErrorState} from "../../../../recoil/atoms/profile/edit/password/passwordError";
import {profileCurrentPasswordConfirmationErrorState} from "../../../../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationError";
import {profileCurrentPasswordCheckErrorState} from "../../../../recoil/atoms/profile/edit/passwordCheck/passwordCheckError";
import {profileCurrentFirstNameErrorState} from "../../../../recoil/atoms/profile/edit/firstName/firstNameError";
import {profileCurrentLastNameErrorState} from "../../../../recoil/atoms/profile/edit/lastName/lastNameError";
import {profileCurrentPatronymicErrorState} from "../../../../recoil/atoms/profile/edit/patronymic/patronymicError";
import {profileCurrentPositionErrorState} from "../../../../recoil/atoms/profile/edit/position/positionError";
import {profileCurrentRankErrorState} from "../../../../recoil/atoms/profile/edit/rank/rankError";
import {profileLoadingState} from "../../../../recoil/atoms/loaders/pages/profile/loading";
import {usersCurrentValueState} from "../../../../recoil/selectors/users/table/current/current";
import {userCurrentIdValueState} from "../../../../recoil/selectors/users/edit/simple/id/id";
import {userCurrentUsernameValueState} from "../../../../recoil/selectors/users/edit/simple/username/username";
import {userCurrentPasswordValueState} from "../../../../recoil/selectors/users/edit/simple/password/password";
import {userCurrentPasswordConfirmationValueState} from "../../../../recoil/selectors/users/edit/simple/passwordConfirmation/passwordConfirmation";
import {usersCurrentRoleSelectedValueState} from "../../../../recoil/selectors/users/edit/simple/role/role";
import {usersCurrentRegionSelectedValueState} from "../../../../recoil/selectors/users/edit/simple/region/region";
import {userCurrentFirstNameValueState} from "../../../../recoil/selectors/users/edit/advanced/firstName/firstName";
import {userCurrentLastNameValueState} from "../../../../recoil/selectors/users/edit/advanced/lastName/lastName";
import {userCurrentPatronymicValueState} from "../../../../recoil/selectors/users/edit/advanced/patronymic/patronymic";
import {userCurrentPositionValueState} from "../../../../recoil/selectors/users/edit/advanced/position/position";
import {userCurrentRankValueState} from "../../../../recoil/selectors/users/edit/advanced/rank/rank";
import {userCurrentUsernameValidValueState} from "../../../../recoil/selectors/users/edit/simple/username/usernameValid";
import {userCurrentPasswordValidValueState} from "../../../../recoil/selectors/users/edit/simple/password/passwordValid";
import {userCurrentPasswordConfirmationValidValueState} from "../../../../recoil/selectors/users/edit/simple/passwordConfirmation/passwordConfirmationValid";
import {usersCurrentRoleSelectedValidValueState} from "../../../../recoil/selectors/users/edit/simple/role/roleValid";
import {usersCurrentRegionSelectedValidValueState} from "../../../../recoil/selectors/users/edit/simple/region/regionValid";
import {userCurrentFirstNameValidValueState} from "../../../../recoil/selectors/users/edit/advanced/firstName/firstNameValid";
import {userCurrentLastNameValidValueState} from "../../../../recoil/selectors/users/edit/advanced/lastName/lastNameValid";
import {userCurrentPatronymicValidValueState} from "../../../../recoil/selectors/users/edit/advanced/patronymic/patronymicValid";
import {userCurrentPositionValidValueState} from "../../../../recoil/selectors/users/edit/advanced/position/positionValid";
import {userCurrentRankValidValueState} from "../../../../recoil/selectors/users/edit/advanced/rank/rankValid";
import {profileCurrentIdValueState} from "../../../../recoil/selectors/profile/edit/id/id";
import {profileCurrentUsernameValueState} from "../../../../recoil/selectors/profile/edit/username/username";
import {profileCurrentPasswordValueState} from "../../../../recoil/selectors/profile/edit/password/password";
import {profileCurrentPasswordConfirmationValueState} from "../../../../recoil/selectors/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentPasswordCheckValueState} from "../../../../recoil/selectors/profile/edit/passwordCheck/passwordCheck";
import {profileCurrentRoleSelectedValueState} from "../../../../recoil/selectors/profile/edit/role/role";
import {profileCurrentRegionSelectedValueState} from "../../../../recoil/selectors/profile/edit/region/region";
import {profileCurrentFirstNameValueState} from "../../../../recoil/selectors/profile/edit/firstName/firstName";
import {profileCurrentLastNameValueState} from "../../../../recoil/selectors/profile/edit/lastName/lastName";
import {profileCurrentPatronymicValueState} from "../../../../recoil/selectors/profile/edit/patronymic/patronymic";
import {profileCurrentPositionValueState} from "../../../../recoil/selectors/profile/edit/position/position";
import {profileCurrentRankValueState} from "../../../../recoil/selectors/profile/edit/rank/rank";
import {profileCurrentUsernameValidValueState} from "../../../../recoil/selectors/profile/edit/username/usernameValid";
import {profileCurrentPasswordValidValueState} from "../../../../recoil/selectors/profile/edit/password/passwordValid";
import {profileCurrentPasswordConfirmationValidValueState} from "../../../../recoil/selectors/profile/edit/passwordConfirmation/passwordConfirmationValid";
import {profileCurrentPasswordCheckValidValueState} from "../../../../recoil/selectors/profile/edit/passwordCheck/passwordCheckValid";
import {profileCurrentRoleSelectedValidValueState} from "../../../../recoil/selectors/profile/edit/role/roleValid";
import {profileCurrentRegionSelectedValidValueState} from "../../../../recoil/selectors/profile/edit/region/regionValid";
import {profileCurrentFirstNameValidValueState} from "../../../../recoil/selectors/profile/edit/firstName/firstNameValid";
import {profileCurrentLastNameValidValueState} from "../../../../recoil/selectors/profile/edit/lastName/lastNameValid";
import {profileCurrentPatronymicValidValueState} from "../../../../recoil/selectors/profile/edit/patronymic/patronymicValid";
import {profileCurrentRankValidValueState} from "../../../../recoil/selectors/profile/edit/rank/rankValid";
import {profileCurrentPositionValidValueState} from "../../../../recoil/selectors/profile/edit/position/positionValid";
import UpdateUserModelRequest from "../../../../models/requests/users/updateUser.model";
import EditUserModelRequest from "../../../../models/requests/users/editUser.model";


export default function EditProfileButton() {
    const { data: session } = useSession();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);
    const setNetworkErrorState = useSetRecoilState(networkErrorState);

    const resetId = useResetRecoilState(profileCurrentIdState);
    const resetUsername = useResetRecoilState(profileCurrentUsernameState);
    const resetPassword = useResetRecoilState(profileCurrentPasswordState);
    const resetPasswordConfirmation = useResetRecoilState(profileCurrentPasswordConfirmationState);
    const resetPasswordCheck = useResetRecoilState(profileCurrentPasswordCheckState);
    const resetRole = useResetRecoilState(profileCurrentRoleSelectedState);
    const resetRegion = useResetRecoilState(profileCurrentRegionSelectedState);
    const resetFirstName = useResetRecoilState(profileCurrentFirstNameState);
    const resetLastName = useResetRecoilState(profileCurrentLastNameState);
    const resetPatronymic = useResetRecoilState(profileCurrentPatronymicState);
    const resetPosition = useResetRecoilState(profileCurrentPositionState);
    const resetRank = useResetRecoilState(profileCurrentRankState);

    const setId = useSetRecoilState(profileCurrentIdState);
    const setUsername = useSetRecoilState(profileCurrentUsernameState);
    const setRole = useSetRecoilState(profileCurrentRoleSelectedState);
    const setRegion = useSetRecoilState(profileCurrentRegionSelectedState);
    const setFirstName = useSetRecoilState(profileCurrentFirstNameState);
    const setLastName = useSetRecoilState(profileCurrentLastNameState);
    const setPatronymic = useSetRecoilState(profileCurrentPatronymicState);
    const setPosition = useSetRecoilState(profileCurrentPositionState);
    const setRank = useSetRecoilState(profileCurrentRankState);

    const resetUsernameValid = useResetRecoilState(profileCurrentUsernameValidState);
    const resetPasswordValid = useResetRecoilState(profileCurrentPasswordValidState);
    const resetPasswordConfirmationValid = useResetRecoilState(profileCurrentPasswordConfirmationValidState);
    const resetPasswordCheckValid = useResetRecoilState(profileCurrentPasswordCheckValidState);
    const resetFirstNameValid = useResetRecoilState(profileCurrentFirstNameValidState);
    const resetLastNameValid = useResetRecoilState(profileCurrentLastNameValidState);
    const resetPatronymicValid = useResetRecoilState(profileCurrentPatronymicValidState);
    const resetPositionValid = useResetRecoilState(profileCurrentPositionValidState);
    const resetRankValid = useResetRecoilState(profileCurrentRankValidState);

    const resetUsernameError = useResetRecoilState(profileCurrentUsernameErrorState);
    const resetPasswordError = useResetRecoilState(profileCurrentPasswordErrorState);
    const resetPasswordConfirmationError = useResetRecoilState(profileCurrentPasswordConfirmationErrorState);
    const resetPasswordCheckError = useResetRecoilState(profileCurrentPasswordCheckErrorState);
    const resetFirstNameError = useResetRecoilState(profileCurrentFirstNameErrorState);
    const resetLastNameError = useResetRecoilState(profileCurrentLastNameErrorState);
    const resetPatronymicError = useResetRecoilState(profileCurrentPatronymicErrorState);
    const resetPositionError = useResetRecoilState(profileCurrentPositionErrorState);
    const resetRankError = useResetRecoilState(profileCurrentRankErrorState);

    const [isLoading, setIsLoading] = useRecoilState(profileLoadingState);

    const id = useRecoilValue(profileCurrentIdValueState);
    const username = useRecoilValue(profileCurrentUsernameValueState);
    const password = useRecoilValue(profileCurrentPasswordValueState);
    const passwordConfirmation = useRecoilValue(profileCurrentPasswordConfirmationValueState);
    const passwordCheck = useRecoilValue(profileCurrentPasswordCheckValueState);
    const role = useRecoilValue(profileCurrentRoleSelectedValueState);
    const region = useRecoilValue(profileCurrentRegionSelectedValueState);
    const firstName = useRecoilValue(profileCurrentFirstNameValueState);
    const lastName = useRecoilValue(profileCurrentLastNameValueState);
    const patronymic = useRecoilValue(profileCurrentPatronymicValueState);
    const position = useRecoilValue(profileCurrentPositionValueState);
    const rank = useRecoilValue(profileCurrentRankValueState);

    const usernameValid = useRecoilValue(profileCurrentUsernameValidValueState);
    const passwordValid = useRecoilValue(profileCurrentPasswordValidValueState);
    const passwordConfirmationValid = useRecoilValue(profileCurrentPasswordConfirmationValidValueState);
    const passwordCheckValid = useRecoilValue(profileCurrentPasswordCheckValidValueState);
    const roleValid = useRecoilValue(profileCurrentRoleSelectedValidValueState);
    const regionValid = useRecoilValue(profileCurrentRegionSelectedValidValueState);
    const firstNameValid = useRecoilValue(profileCurrentFirstNameValidValueState);
    const lastNameValid = useRecoilValue(profileCurrentLastNameValidValueState);
    const patronymicValid = useRecoilValue(profileCurrentPatronymicValidValueState);
    const positionValid = useRecoilValue(profileCurrentPositionValidValueState);
    const rankValid = useRecoilValue(profileCurrentRankValidValueState);

    const refresh = async () => {
        resetNetworkErrorState();

        resetId();
        resetUsername();
        resetPassword();
        resetPasswordConfirmation();
        resetPasswordCheck();
        resetRole();
        resetRegion();
        resetFirstName();
        resetLastName();
        resetPatronymic();
        resetPosition();
        resetRank();

        resetUsernameValid();
        resetPasswordValid();
        resetPasswordConfirmationValid();
        resetPasswordCheckValid();
        resetFirstNameValid();
        resetLastNameValid();
        resetPatronymicValid();
        resetPositionValid();
        resetRankValid();

        resetUsernameError();
        resetPasswordError();
        resetPasswordConfirmationError();
        resetPasswordCheckError();
        resetFirstNameError();
        resetLastNameError();
        resetPatronymicError();
        resetPositionError();
        resetRankError();

        setIsLoading(true);

        await axios.create().get(`/api/users/current`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.loggedIn) {
                        setId(response.data.user.id);
                        setUsername(response.data.user.username);
                        setRole(response.data.user.role);
                        await axios.create().get(`/api/regions/${response.data.user.regionId}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
                            .then(async (response) => {
                                if (response.data.success) {
                                    let region = new RegionModelResponse();
                                    region.id = response.data.region.id;
                                    region.name = response.data.region.name;
                                    region.archived = response.data.region.archived;
                                    region.usersCount = response.data.region.usersCount;
                                    setRegion(region);
                                } else {
                                    message.error(response.data.error);
                                    setNetworkErrorState(response.data.error);
                                }
                            })
                            .catch(async (error) => {
                                message.error(JSON.stringify(error));
                                setNetworkErrorState(JSON.stringify(error));
                            })
                        setFirstName(response.data.user.firstName);
                        setLastName(response.data.user.lastName);
                        setPatronymic(response.data.user.patronymic);
                        setPosition(response.data.user.position);
                        setRank(response.data.user.rank);
                    }
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
            })
            .finally(() => {setIsLoading(false);})
    };

    const handleUpdate = async() => {
        resetNetworkErrorState();
        setIsLoading(true);

        let request = new EditUserModelRequest();
        request.id = id;


        if((password && password.length > 0) || (passwordConfirmation && passwordConfirmation.length > 0) || (passwordCheck && passwordCheck.length > 0)) {
            request.newPassword = password;
            request.confirmPassword = passwordConfirmation;
            request.password = passwordCheck;
        }

        if(firstName && firstName.length > 0) {
            request.firstName = firstName;
        }

        if(lastName && lastName.length > 0) {
            request.lastName = lastName;
        }

        if(patronymic && patronymic.length > 0) {
            request.patronymic = patronymic;
        }

        if(position && position.length > 0) {
            request.position = position;
        }

        if(rank && rank.length > 0) {
            request.rank = rank;
        }

        axios.create().post(`/api/users/edit/${request.id}`, request,{headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.updated) {
                        message.success(`Оновлено користувача з логіном - ${response.data.user.username}`);
                        resetId();
                        resetUsername();
                        resetPassword();
                        resetPasswordConfirmation();
                        resetRole();
                        resetRegion();
                        resetFirstName();
                        resetLastName();
                        resetPatronymic();
                        resetPosition();
                        resetRank();
                        await refresh();
                    }
                    else {
                        message.error(response.data.error);
                        setNetworkErrorState(response.data.error);
                    }
                } else {
                    message.error(response.data.error);
                    setNetworkErrorState(response.data.error);
                }
            })
            .catch(async (error) => {
                message.error(JSON.stringify(error));
                setNetworkErrorState(JSON.stringify(error));
            })
            .finally(() => {setIsLoading(false);})
    }

    return (
        <Form.Item
            style={{
                width: "100%",
                marginLeft: '15px',
                marginBottom: '0'
            }}
        >
            <Button
                loading={isLoading}
                type="primary"
                style={{
                    width: '100%',
                    borderRadius: '5px',
                }}
                onClick={async () => {
                    await handleUpdate();
                }}
            >
                Редагувати
            </Button>
        </Form.Item>
    );
}
