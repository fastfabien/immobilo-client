import {
    REGISTER_SUCCESS,
    GOOGLE_REGISTER_SUCCESS,
    GOOGLE_REGISTER_FAILED,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAIL,
    REGISTER_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    LOGIN_SUCCESS,
    GOOGLE_LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    BRICKS_SELLED_SUCCESS,
    BRICKS_SELLED_FAIL
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = user
    ? { isLoggedIn: true, user, token }
    : { isLoggedIn: false, user: null, token: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            }
        case GOOGLE_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }
        case GOOGLE_REGISTER_FAILED:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                token: payload.accessToken

            };
        case GOOGLE_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                user: payload.user,
            };
        case BRICKS_SELLED_SUCCESS:
            return {
                ...state,
                user: payload.user,
            };
        case UPLOAD_DOCUMENT_SUCCESS:
            return {
                ...state,
                user: payload.user,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}