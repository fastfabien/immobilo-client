import axios from "axios";
import authHeader from "./auth-header"

const API_URL = "/api/auth/";
const USER_API_URL = "/api/user/"
const BRICK_API_URL = "/api/bricks"

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
};

const googleRegister = (accessToken) => {
    return axios.post(API_URL + "signUpGoogle", {
        credential: accessToken
    }).then((response) => {
        console.log(response)
        if (response) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
    })
}

const googleLogin = (accessToken) => {
    return axios.post(API_URL + "signInGoogle", {
        credential: accessToken
    }).then((response) => {
        console.log(response)
        if (response) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        return response.data
    })
}


const uploadUserDocument = (formData, accessToken) => {
    return axios.post(USER_API_URL + "document", {
        formData
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': `${accessToken}`
        }
    })
}

const confirmUserInformation = (data, accessToken) => {
    return axios.patch(USER_API_URL + `completeInfo`, {
        data
    }, {
        headers: {
            'x-access-token': `${accessToken}`,
        }
    }).then((response) => {
        if (response) {
            localStorage.setItem("user", JSON.stringify(response.data.users));
        }
        return response.data;
    });
}

const buyBricks = (data) => {
    return axios.post(BRICK_API_URL, data, { headers: authHeader() })
        .then((response) => {
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            return response.data;
        });
}

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username,
        password,
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
    });
};

const refreshUserInformation = () => {
    return axios.get('/api/user/refresh', { headers: authHeader() })
    .then((response) => {
        console.log(response.data.user.wallet)
        return response.data;
    })
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const verifyUser = (code) => {
    return axios.get(API_URL + "confirm/" + code).then((response) => {
        return response.data;
    });
};

export default {
    register,
    login,
    logout,
    verifyUser,
    googleRegister,
    googleLogin,
    confirmUserInformation,
    uploadUserDocument,
    buyBricks,
    refreshUserInformation
};

