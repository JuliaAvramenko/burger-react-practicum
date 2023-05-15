import { CHANGE_USER_DATA_FAILED, CHANGE_USER_DATA_SUCCESS, CREATE_USER_FAILED, CREATE_USER_SUCCESS, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_STATUS } from "../constants"
import { auth } from "./auth"

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(auth(undefined, { type: "" })).toEqual({
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
            logInFailed: false
        })

    })


    it('should handle AUTH REDUCERS', () => {
        // CREATE_USER_SUCCESS
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: CREATE_USER_SUCCESS,
                    userDetails: {
                        success: true,
                        user: {
                            email: "test@ex.ru",
                            name: "222"
                        },
                        accessToken: "123",
                        refreshToken: "456",
                    }
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }
        )

        // CREATE_USER_FAILED
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: CREATE_USER_FAILED,
                    error: "Ошибка"

                }
            )
        ).toEqual(
            {
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "",
                    refreshToken: "",
                },
                authFailed: true,
                error: "Ошибка",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }
        )
        // LOGIN_SUCCESS
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: LOGIN_SUCCESS,
                    userDetails: {
                        success: true,
                        user: {
                            email: "test@ex.ru",
                            name: "222"
                        },
                        accessToken: "123",
                        refreshToken: "456",
                    }
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }
        )
        // LOGIN_FAILED
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: CREATE_USER_FAILED,
                    error: "Ошибка"
                }
            )
        ).toEqual(
            {
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "",
                    refreshToken: "",
                },
                authFailed: true,
                error: "Ошибка",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }
        )
        // FORGOT_PASSWORD_SUCCESS
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: FORGOT_PASSWORD_SUCCESS,
                    passwordResetStatus: {
                        success: true
                    }
                }
            )
        ).toEqual(
            {
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
                forgotPasswordSuccess: true,
                logout: false,
                logInFailed: false
            }
        )
        // FORGOT_PASSWORD_FAILED
        expect(
            auth(
                {
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
                    logInFailed: false
                },
                {
                    type: FORGOT_PASSWORD_FAILED,
                    passwordResetStatus: {
                        success: false
                    }
                }
            )
        ).toEqual(
            {

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
                logInFailed: false

            }
        )
        // RESET_PASSWORD_SUCCESS
        expect(
            auth(
                {
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
                    // проверить 
                    forgotPasswordSuccess: true,
                    logout: false,
                    logInFailed: false
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
                passwordResetSuccess: true,
                forgotPasswordSuccess: true,
                logout: false,
                logInFailed: false
            }

        )
        // RESET_PASSWORD_FAILED
        expect(
            auth(
                {
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
                    // проверить 
                    forgotPasswordSuccess: true,
                    logout: false,
                    logInFailed: false
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
                // проверить 
                forgotPasswordSuccess: true,
                logout: false,
                logInFailed: false
            }

        )
        // RESET_STATUS
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
                {
                    type: RESET_STATUS
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            },

        )
        // LOGOUT_SUCCESS
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
                {
                    type: LOGOUT_SUCCESS
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "",
                    refreshToken: "",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: true,
                logInFailed: false
            }

        )
        // LOGOUT_FAILED
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
                {
                    type: LOGOUT_FAILED,
                    error: "Ошибка"
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
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
                logInFailed: false
            }

        )
        // GET_USER_DATA_SUCCESS
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
                {
                    type: GET_USER_DATA_SUCCESS,
                    userDetails: {
                        success: true,
                        user: {
                            // проверить
                            email: "test@ex.ru",
                            name: "222"
                        }
                    }
                }
            )
        ).toEqual(
            {
                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }

        )
        // GET_USER_DATA_FAILED
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
                {
                    type: GET_USER_DATA_FAILED,
                    success: false,
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    }
                }
            )
        ).toEqual(
            {
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }

        )
        // CHANGE_USER_DATA_SUCCESS
        expect(
            auth(
                {

                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false

                },
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

                user: {
                    email: "test1@ex.ru",
                    name: "2223"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false

            }

        )
        // CHANGE_USER_DATA_FAILED
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
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
                user: {
                    email: "",
                    name: ""
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false
            }

        )
        // REFRESH_TOKEN_SUCCESS
        expect(
            auth(
                {

                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false

                },
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

                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "12345",
                    refreshToken: "45678",
                },
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false

            }

        )
        // REFRESH_TOKEN_FAILED
        expect(
            auth(
                {
                    user: {
                        email: "test@ex.ru",
                        name: "222"
                    },
                    session: {
                        accessToken: "123",
                        refreshToken: "456",
                    },
                    authFailed: false,
                    error: "",
                    passwordResetSuccess: false,
                    forgotPasswordSuccess: false,
                    logout: false,
                    logInFailed: false
                },
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
            {

                user: {
                    email: "test@ex.ru",
                    name: "222"
                },
                session: {
                    accessToken: "123",
                    refreshToken: "456",
                },
                // проверить
                authFailed: false,
                error: "",
                passwordResetSuccess: false,
                forgotPasswordSuccess: false,
                logout: false,
                logInFailed: false

            }

        )


    })


})
