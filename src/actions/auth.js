import {
    REGISTER_SUCCESS,
    GOOGLE_REGISTER_SUCCESS,
    GOOGLE_REGISTER_FAILED,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAIL,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILED,
    LOGOUT,
    SET_MESSAGE,
    BRICKS_SELLED_SUCCESS,
    BRICKS_SELLED_FAIL,
    INFORMATION_UPDATED,
    INFORMATION_UPDATE_FAILED
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message;

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data.user, accessToken: data.token }
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const googleRegister = (accessToken, navigate) => (dispatch) => {
    return AuthService.googleRegister(accessToken).then((data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data }
        });
        navigate("/")

        return Promise.resolve();
    },
        (error) => {

            const message = (error.response && error.response.data && error.response.data.message) || error.response.data.message || error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        })
}



export const confirmUserInformation = (data, accessToken) => (dispatch) => {
    return AuthService.confirmUserInformation(data, accessToken).then(
        (data) => {
            dispatch({
                type: UPDATE_SUCCESS,
                payload: { user: data }
            });

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type: UPDATE_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

export const buyBricks = (data) => (dispatch) => {
    return AuthService.buyBricks(data).then(
        (data) => {
            dispatch({
                type: BRICKS_SELLED_SUCCESS,
                payload: { user: data }
            })
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type: BRICKS_SELLED_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

export const uploadUserDocument = (typeDocument, accessToken) => (dispatch) => {
    return AuthService.uploadUserDocument(typeDocument, accessToken).then((data) => {
        dispatch({
            type: UPLOAD_DOCUMENT_SUCCESS,
            payload: { user: data }
        });
        return Promise.resolve();
    },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type: UPLOAD_DOCUMENT_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

export const googleLogin = (accessToken, navigate) => (dispatch) => {
    return AuthService.googleLogin(accessToken).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data }
            });

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.response.data.message || error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
};


export const refreshUserInformation = () => (dispatch) => {
    return AuthService.refreshUserInformation().then(
        (data) => {
            dispatch({
                type: INFORMATION_UPDATED,
                payload: { user: data }
            })

            return Promise.resolve()
        },
        (error) => {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.response.data.message || error.toString();

            dispatch({
                type: INFORMATION_UPDATE_FAILED,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
}