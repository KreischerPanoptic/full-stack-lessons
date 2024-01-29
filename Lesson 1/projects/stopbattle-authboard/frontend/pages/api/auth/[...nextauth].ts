import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AUTH_URL} from "../../../config/config";
import RefreshModelResponse from "../../../models/responses/auth/refresh.model";
import LoginModelResponse from "../../../models/responses/auth/login.model";

async function refreshAccessToken(username: string, token: string) {
    try {
        const response = await axios.create().post<RefreshModelResponse>(`${AUTH_URL}/api/auth/refresh`, {username: username, token: token, isRefreshNeeded: true});

        const refreshResponse = await response.data;

        if (!refreshResponse.generated) {
            throw refreshResponse.error;
        }

        if (refreshResponse.generated && refreshResponse.token) {
            let decoded = jwt_decode(refreshResponse.token);
            let decodedToken = {
                //@ts-ignore
                username: `${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}`,
                //@ts-ignore
                token_version: `${decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/version']}`,
                //@ts-ignore
                session_start: parseInt(`${decoded.session_start}`)* 1000,
                //@ts-ignore
                session_end: parseInt(`${decoded.session_end}`)* 1000,
                //@ts-ignore
                is_admin: decoded.is_admin && decoded.is_admin === true ? true : false,
                //@ts-ignore
                region_id: parseInt(`${decoded.region_id}`),
                //@ts-ignore
                region: `${decoded.region}`,
                //@ts-ignore
                role: `${decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}`,
                //@ts-ignore
                first_name: `${decoded.first_name}`,
                //@ts-ignore
                last_name: `${decoded.last_name}`,
                //@ts-ignore
                position: `${decoded.position}`,
                //@ts-ignore
                refresh_token: `${decoded.refresh_token}`,
                //@ts-ignore
                refresh_token_start: parseInt(`${decoded.refresh_token_nbf}`)* 1000,
                //@ts-ignore
                refresh_token_expires: parseInt(`${decoded.refresh_token_exp}`)* 1000,
                //@ts-ignore
                start: parseInt(`${decoded.nbf}`) * 1000,
                //@ts-ignore
                expires: parseInt(`${decoded.exp}`) * 1000,
                //@ts-ignore
                issuer: `${decoded.iss}`,
                //@ts-ignore
                totp: decoded['2fa'] && decoded['2fa'] === true ? true : false,
                token: refreshResponse.token ?? token
            }
            return {
                accessToken: decodedToken.token,
                accessTokenExpires: decodedToken.expires,
                refreshToken: decodedToken.refresh_token,
                refreshTokenExpires: decodedToken.refresh_token_expires,
                username: decodedToken.username,
                firstName: decodedToken.first_name,
                isAdmin: decodedToken.is_admin,
                sessionStart: decodedToken.session_start,
                sessionEnd: decodedToken.session_end,
                error: undefined,
                user: decodedToken,
            }
        }
        return Promise.reject(new Error(refreshResponse.error!));
    } catch (error) {
        return {
            error: "RefreshAccessTokenError",
        }
    }
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'auth',
            name: 'Внутрішній аккаунт',
            credentials: {
                username: { label: "Ім'я користувача", type: "text", placeholder: "user" },
                password: {  label: "Пароль", type: "password" },
                code: { label: "2FA код", type: "text" },
                rememberMe: { label: "Запам'ятати мене?", type: "checkbox"}
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await axios.create().post(`${AUTH_URL}/api/auth/login`, {
                    rememberMe: credentials!.rememberMe === 'on',
                    username: credentials!.username,
                    password: credentials!.password,
                    code: credentials!.code
                });
                let response: LoginModelResponse = new LoginModelResponse();
                response.success = res.data.success;
                response.authenticatorNeeded = res.data.authenticatorNeeded;
                response.generated = res.data.generated;
                response.error = res.data.error;
                response.token = res.data.token;
                if(response.authenticatorNeeded) {
                    return Promise.reject(new Error('2fa_code_required'));
                }
                // If no error and we have user data, return it
                if (response.generated && response.token) {
                    let decoded = jwt_decode(response.token);
                    //@ts-ignore
                    if((`${decoded.is_admin}`) !== 'true') {
                        return Promise.reject(new Error('Заборонено!'));
                    }
                    let user = {
                        //@ts-ignore
                        username: `${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}`,
                        //@ts-ignore
                        token_version: `${decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/version']}`,
                        //@ts-ignore
                        session_start: parseInt(`${decoded.session_start}`) * 1000,
                        //@ts-ignore
                        session_end: parseInt(`${decoded.session_end}`) * 1000,
                        //@ts-ignore
                        is_admin: decoded.is_admin && decoded.is_admin === true ? true : false,
                        //@ts-ignore
                        region_id: parseInt(`${decoded.region_id}`),
                        //@ts-ignore
                        region: `${decoded.region}`,
                        //@ts-ignore
                        role: `${decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}`,
                        //@ts-ignore
                        first_name: `${decoded.first_name}`,
                        //@ts-ignore
                        last_name: `${decoded.last_name}`,
                        //@ts-ignore
                        position: `${decoded.position}`,
                        //@ts-ignore
                        refresh_token: `${decoded.refresh_token}`,
                        //@ts-ignore
                        refresh_token_start: parseInt(`${decoded.refresh_token_nbf}`) * 1000,
                        //@ts-ignore
                        refresh_token_expires: parseInt(`${decoded.refresh_token_exp}`) * 1000,
                        //@ts-ignore
                        start: parseInt(`${decoded.nbf}`) * 1000,
                        //@ts-ignore
                        expires: parseInt(`${decoded.exp}`) * 1000,
                        //@ts-ignore
                        issuer: `${decoded.iss}`,
                        //@ts-ignore
                        totp: decoded['2fa'] && decoded['2fa'] === true ? true : false,
                        token: response.token
                    }
                    return user;
                }
                return Promise.reject(new Error(response.error ? response.error : 'Внутрішня помилка'));
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: "qFNE3UDx3PFkLAYjkfTaD3JSw7uT9rrkevpm9sMLg5F7zhcKdFpVpgbxJvDYhepG",
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    accessToken: user.token,
                    accessTokenExpires: user.expires,
                    refreshToken: user.refresh_token,
                    refreshTokenExpires: user.refresh_token_expires,
                    username: user.username,
                    firstName: user.first_name,
                    isAdmin: user.is_admin,
                    sessionStart: user.session_start,
                    sessionEnd: user.session_end,
                    error: user.error,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            // @ts-ignore
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            // Access token has expired, try to update it
            // @ts-ignore
            let tokn = await refreshAccessToken(token.username, token.refreshToken)
            return tokn;
        },

        async session({session, user, token}) {
            // @ts-ignore
            session.user = user ? user : token.user
            session.username = user ? user.username : token.username
            session.accessToken = token.accessToken
            session.error = token.error
            session.firstName = user ? `${user.first_name}`.length > 0 ?  user.first_name : null : `${token.firstName}`.length > 0 ? token.firstName : null
            session.isAdmin = user ? user.is_admin : token.isAdmin
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
})
