import type { NextPage } from 'next'
import React, {useEffect} from "react";
import AdminLayout from "../components/layouts/adminLayout";
import {message} from "antd";
import axios from "axios";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {networkErrorState} from "../recoil/atoms/shared/error/error";
import {useSession} from "next-auth/react";
import RegionModelResponse from "../models/responses/regions/region.model";
import {profileLoadingState} from "../recoil/atoms/loaders/pages/profile/loading";
import {profileCurrentIdState} from "../recoil/atoms/profile/edit/id/id";
import {profileCurrentUsernameState} from "../recoil/atoms/profile/edit/username/username";
import {profileCurrentPasswordState} from "../recoil/atoms/profile/edit/password/password";
import {profileCurrentPasswordConfirmationState} from "../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmation";
import {profileCurrentRoleSelectedState} from "../recoil/atoms/profile/edit/role/role";
import {profileCurrentRegionSelectedState} from "../recoil/atoms/profile/edit/region/region";
import {profileCurrentFirstNameState} from "../recoil/atoms/profile/edit/firstName/firstName";
import {profileCurrentLastNameState} from "../recoil/atoms/profile/edit/lastName/lastName";
import {profileCurrentPatronymicState} from "../recoil/atoms/profile/edit/patronymic/patronymic";
import {profileCurrentPositionState} from "../recoil/atoms/profile/edit/position/position";
import {profileCurrentRankState} from "../recoil/atoms/profile/edit/rank/rank";
import {profileCurrentUsernameValidState} from "../recoil/atoms/profile/edit/username/usernameValid";
import {profileCurrentPasswordValidState} from "../recoil/atoms/profile/edit/password/passwordValid";
import {profileCurrentPasswordConfirmationValidState} from "../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationValid";
import {profileCurrentFirstNameValidState} from "../recoil/atoms/profile/edit/firstName/firstNameValid";
import {profileCurrentLastNameValidState} from "../recoil/atoms/profile/edit/lastName/lastNameValid";
import {profileCurrentPatronymicValidState} from "../recoil/atoms/profile/edit/patronymic/patronymicValid";
import {profileCurrentPositionValidState} from "../recoil/atoms/profile/edit/position/positionValid";
import {profileCurrentRankValidState} from "../recoil/atoms/profile/edit/rank/rankValid";
import {profileCurrentUsernameErrorState} from "../recoil/atoms/profile/edit/username/usernameError";
import {profileCurrentPasswordErrorState} from "../recoil/atoms/profile/edit/password/passwordError";
import {profileCurrentPasswordConfirmationErrorState} from "../recoil/atoms/profile/edit/passwordConfirmation/passwordConfirmationError";
import {profileCurrentFirstNameErrorState} from "../recoil/atoms/profile/edit/firstName/firstNameError";
import {profileCurrentLastNameErrorState} from "../recoil/atoms/profile/edit/lastName/lastNameError";
import {profileCurrentPatronymicErrorState} from "../recoil/atoms/profile/edit/patronymic/patronymicError";
import {profileCurrentPositionErrorState} from "../recoil/atoms/profile/edit/position/positionError";
import {profileCurrentRankErrorState} from "../recoil/atoms/profile/edit/rank/rankError";
import {profileCurrentPasswordCheckState} from "../recoil/atoms/profile/edit/passwordCheck/passwordCheck";
import {profileCurrentPasswordCheckValidState} from "../recoil/atoms/profile/edit/passwordCheck/passwordCheckValid";
import {profileCurrentPasswordCheckErrorState} from "../recoil/atoms/profile/edit/passwordCheck/passwordCheckError";
import EditProfileCard from "../components/cards/profile/edit/editCard";

const Profile: NextPage = () => {
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

    const setIsLoading = useSetRecoilState(profileLoadingState);

    useEffect(() => {
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

        axios.create().get(`/api/users/current`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
            .then(async (response) => {
                if (response.data.success) {
                    if(response.data.loggedIn) {
                        setId(response.data.user.id);
                        setUsername(response.data.user.username);
                        setRole(response.data.user.role);
                        axios.create().get(`/api/regions/${response.data.user.regionId}`, {headers: {'Authorization' : `Bearer ${session?.accessToken}`}})
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
    }, []);

    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <EditProfileCard/>
        </div>
    )
}

//@ts-ignore
Profile.auth = true;
//@ts-ignore
Profile.admin = true;

//@ts-ignore
Profile.getLayout = function getLayout(page: any) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default Profile
