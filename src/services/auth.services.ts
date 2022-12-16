import {servicePath} from "./connectors/axios";
import {deleteCookie, setCookie} from "./connectors/cookies";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Components/Providers/Authorization/Authorization.provider";

export const login = async <User>(email: string, pwd: string) => {
  let user = {} as User;
  servicePath
    .post('/auth/login', {
      "password": pwd,
      "email": email
    })
    .then(async res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      if (!res.data["token"]) {
        new Error("Missing token")
      }
      await setCookie('token', res.data["token"], 1)
      user = res.data["user"]
    })
  return user
}




