import { AnyAction } from "redux";
import { TAuthStore } from "../../utils/types";
import {
    CREATE_USER_FAILED, CREATE_USER_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESS,
    LOGOUT_FAILED, LOGOUT_SUCCESS, RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS, RESET_STATUS, CHANGE_USER_DATA_SUCCESS, CHANGE_USER_DATA_FAILED, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from "../constants";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "../constants";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS } from "../constants";



const initialState: TAuthStore = {
    user: {
        email: "",
        name: ""
    },
    session: {
        accessToken: "",
        refreshToken: "",
    },
    authFailed: false,
    error: "",
    passwordResetSuccess: false,
    forgotPasswordSuccess: false,
    logout: false,

}

export const auth = (state: TAuthStore = initialState, action: AnyAction) => {
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
                user: {},
                session: {},
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
                user: {},
                session: {},
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
                session: null,
                logout: true,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                session: null,
                logout: false,
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
            }

        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.userDetails.user
                },
            }
        case GET_USER_DATA_FAILED:
            return {
                ...state,
                user: {},
            }


        case CHANGE_USER_DATA_SUCCESS:
            console.log(`I am user details ${action.userDetails}`);

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
                user: {},
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