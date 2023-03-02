export default function authHeader() {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
        return { 'x-access-token': token };
    } else {
        return {};
    }
}