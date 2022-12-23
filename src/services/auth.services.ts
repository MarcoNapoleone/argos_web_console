import {servicePath} from "./connectors/axios";
import {deleteCookie, setCookie} from "./connectors/cookies";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Components/Providers/Authorization/Authorization.provider";
import {User} from "./users.services";

export const login = async (email: string, pwd: string) => {
  let user = {} as User;
  return servicePath
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
      if (user) {
        return user
      } else {
        return new Error("Missing user")
      }
    })
}




