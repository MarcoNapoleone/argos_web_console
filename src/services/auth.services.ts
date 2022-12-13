import {servicePath} from "./connectors/axios";
import {setCookie} from "./connectors/cookies";

export const login = async (email: string, pwd: string) => {
    servicePath
        .post('/auth/login', {
            "password": pwd,
            "email": email
        })
        .then(res => {
            if (res.status !== 200) {
                return new Error(res.data["message"])
            }
            if (!res.data["token"]) {
                new Error("Missing token")
            }
            setCookie('token', res.data["token"], 1)
        })
}
