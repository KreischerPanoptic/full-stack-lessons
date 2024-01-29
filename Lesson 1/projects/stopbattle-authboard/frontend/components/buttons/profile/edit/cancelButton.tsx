import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import React from 'react';
import Button from "antd-button-color";
import {Form} from "antd";
import { useRouter } from 'next/router';
import {networkErrorState} from "../../../../recoil/atoms/shared/error/error";
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


export default function CancelEditProfileButton() {
    const router = useRouter();

    const resetNetworkErrorState = useResetRecoilState(networkErrorState);

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

    return (
        <Form.Item
            style={{
                width: "100%",
                marginBottom: '0'
            }}
        >
            <Button
                loading={isLoading}
                type="danger"
                style={{
                    width: '100%',
                    borderRadius: '5px'
                }}
                onClick={async () => {
                    await router.push('/');
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

                    resetNetworkErrorState();
                    setIsLoading(false);
                }}
            >
                Скасувати
            </Button>
        </Form.Item>
    );
}
