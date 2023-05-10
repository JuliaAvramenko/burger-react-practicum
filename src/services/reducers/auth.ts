import { AnyAction } from "redux";
import { TAuthStore, TBurgerActions } from "../../utils/types";
import {
    CREATE_USER_FAILED, CREATE_USER_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESS,
    LOGOUT_FAILED, LOGOUT_SUCCESS, RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS, RESET_STATUS, CHANGE_USER_DATA_SUCCESS, CHANGE_USER_DATA_FAILED, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from "../constants";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "../constants";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS } from "../constants";
import { EmptyStore } from "./root-reducer";
import { setCookie } from "../../utils/cookies";


export const auth = (state: TAuthStore = EmptyStore.auth, action: TBurgerActions) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.userDetails.user
                },
                session: {
                    accessToken: action.userDetails.accessToken,
                    refreshToken: action.userDetails.refreshToken
                },
                authFailed: false,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                error: ""
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "",
                    refreshToken: ""
                },
                authFailed: true,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                error: action.error,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.userDetails.user
                },
                session: {
                    accessToken: action.userDetails.accessToken,
                    refreshToken: action.userDetails.refreshToken
                },
                logInFailed: false,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                error: ""
            }
        case LOGIN_FAILED:
            return {
                ...state,
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "",
                    refreshToken: ""
                },
                logInFailed: true,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                error: action.error,
            }




        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordSuccess: true,

            }
        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordSuccess: false,
            }


        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                passwordResetSuccess: true,

            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                passwordResetSuccess: false,
            }

        case RESET_STATUS:
            return {
                ...state,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                session: {
                    accessToken: "",
                    refreshToken: ""
                },
                logout: true,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                session: {
                    accessToken: "",
                    refreshToken: ""
                },
                logout: false,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
            }

        case GET_USER_DATA_SUCCESS:
            //console.log(JSON.stringify(action))
            return {
                ...state,
                user: {
                    email: action.userDetails.user.email,
                    name: action.userDetails.user.name
                },
            }
        case GET_USER_DATA_FAILED:
            //console.log(JSON.stringify(action))
            return {
                ...state,
                user: {
                    email: "",
                    name: ""
                },
            }


        case CHANGE_USER_DATA_SUCCESS:
            //console.log(`I am user details ${action.userDetails}`);

            return {
                ...state,
                user: {
                    name: action.userDetails.user.name,
                    email: action.userDetails.user.email
                },
            }
        case CHANGE_USER_DATA_FAILED:
            return {
                ...state,
                user: {
                    email: "",
                    name: ""
                },
            }

        case REFRESH_TOKEN_SUCCESS:

            return {
                ...state,
                session: {
                    accessToken: action.token.accessToken,
                    refreshToken: action.token.refreshToken
                },

            }
        case REFRESH_TOKEN_FAILED:
            return {
                ...state,

            }

        default:
            return state
    }
}