import { CHANGE_USER_DATA_FAILED, CHANGE_USER_DATA_SUCCESS, CREATE_USER_FAILED, CREATE_USER_SUCCESS, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_STATUS } from "../constants"
import { auth } from "./auth"
import { EmptyStore } from "./root-reducer"

const user = {
    email: "test@ex.ru",
    name: "222"
}

const session = {
    accessToken: "123",
    refreshToken: "456",
}

const authenticated = {
    ...EmptyStore.auth,
    user: user,
    session: session,
}

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(auth(undefined, { type: "" })).toEqual(EmptyStore.auth)

    })


    it('should handle AUTH REDUCERS', () => {
        // CREATE_USER_SUCCESS
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: CREATE_USER_SUCCESS,
                    userDetails: {
                        success: true,
                        user: user,
                        ...session
                    }
                }
            )
        ).toEqual(
            authenticated
        )

        // CREATE_USER_FAILED
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: CREATE_USER_FAILED,
                    error: "Ошибка"

                }
            )
        ).toEqual(
            {
                ...EmptyStore.auth,
                authFailed: true,
                error: "Ошибка",
            }
        )
        // LOGIN_SUCCESS
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: LOGIN_SUCCESS,
                    userDetails: {
                        success: true,
                        user: user,
                        ...session
                    }
                }
            )
        ).toEqual(
            authenticated
        )
        // LOGIN_FAILED
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: CREATE_USER_FAILED,
                    error: "Ошибка"
                }
            )
        ).toEqual(
            {
                ...EmptyStore.auth,
                authFailed: true,
                error: "Ошибка",
            }
        )
        // FORGOT_PASSWORD_SUCCESS
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: FORGOT_PASSWORD_SUCCESS,
                    passwordResetStatus: {
                        success: true
                    }
                }
            )
        ).toEqual(
            {
                ...EmptyStore.auth,
                forgotPasswordSuccess: true,
            }
        )
        // FORGOT_PASSWORD_FAILED
        expect(
            auth(
                EmptyStore.auth,
                {
                    type: FORGOT_PASSWORD_FAILED,
                    passwordResetStatus: {
                        success: false
                    }
                }
            )
        ).toEqual(
            EmptyStore.auth
        )
        // RESET_PASSWORD_SUCCESS
        expect(
            auth(
                {
                    ...EmptyStore.auth,
                    forgotPasswordSuccess: true,
                },
                {
                    type: RESET_PASSWORD_SUCCESS,
                    passwordResetStatus: {
                        success: true
                    }
                }
            )
        ).toEqual(
            {
                ...EmptyStore.auth,
                passwordResetSuccess: true,
                forgotPasswordSuccess: true,
            }

        )
        // RESET_PASSWORD_FAILED
        expect(
            auth(
                {
                    ...EmptyStore.auth,
                    forgotPasswordSuccess: true,
                },
                {
                    type: RESET_PASSWORD_FAILED,
                    passwordResetStatus: {
                        success: false
                    }
                }
            )
        ).toEqual(
            {
                ...EmptyStore.auth,
                forgotPasswordSuccess: true,
            }

        )
        // RESET_STATUS
        expect(
            auth(
                authenticated,
                {
                    type: RESET_STATUS
                }
            )
        ).toEqual(
            authenticated

        )
        // LOGOUT_SUCCESS
        expect(
            auth(
                authenticated,
                {
                    type: LOGOUT_SUCCESS
                }
            )
        ).toEqual(
            {
                ...authenticated,
                session: EmptyStore.auth.session,
                logout: true,
            }

        )
        // LOGOUT_FAILED
        expect(
            auth(
                authenticated,
                {
                    type: LOGOUT_FAILED,
                    error: "Ошибка"
                }
            )
        ).toEqual(
            {
                ...authenticated,
                session: EmptyStore.auth.session,
            }

        )
        // GET_USER_DATA_SUCCESS
        expect(
            auth(
                authenticated,
                {
                    type: GET_USER_DATA_SUCCESS,
                    userDetails: {
                        success: true,
                        user: user
                    }
                }
            )
        ).toEqual(
            authenticated

        )
        // GET_USER_DATA_FAILED
        expect(
            auth(
                authenticated,
                {
                    type: GET_USER_DATA_FAILED,
                    success: false,
                    user: user
                }
            )
        ).toEqual(
            {
                ...authenticated,
                user: EmptyStore.auth.user,
            }

        )
        // CHANGE_USER_DATA_SUCCESS
        expect(
            auth(
                authenticated,
                {
                    type: CHANGE_USER_DATA_SUCCESS,
                    userDetails:
                    {
                        success: true,
                        user: {
                            email: "test1@ex.ru",
                            name: "2223"
                        }
                    }
                }
            )
        ).toEqual(
            {
                ...authenticated,
                user: {
                    email: "test1@ex.ru",
                    name: "2223"
                },

            }

        )
        // CHANGE_USER_DATA_FAILED
        expect(
            auth(
                authenticated,
                {
                    type: CHANGE_USER_DATA_FAILED,
                    success: false,
                    user: {
                        email: "test1@ex.ru",
                        name: "2223"
                    }
                }
            )
        ).toEqual(
            {
                ...authenticated,
                user: EmptyStore.auth.user,
            }

        )
        // REFRESH_TOKEN_SUCCESS
        expect(
            auth(
                authenticated,
                {
                    type: REFRESH_TOKEN_SUCCESS,
                    success: true,
                    token: {
                        accessToken: "12345",
                        refreshToken: "45678",
                    }
                }
            )
        ).toEqual(
            {

                ...authenticated,
                session: {
                    accessToken: "12345",
                    refreshToken: "45678",
                },

            }

        )
        // REFRESH_TOKEN_FAILED
        expect(
            auth(
                authenticated,
                {
                    type: REFRESH_TOKEN_FAILED,
                    success: false,
                    session: {
                        accessToken: "12345",
                        refreshToken: "45678",
                    }
                }
            )
        ).toEqual(
            authenticated
        )


    })


})
