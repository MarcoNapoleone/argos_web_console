import axios from "axios";

export const podServicePath = axios.create({baseURL: `https://argos-iot.com/webservice`});
export const servicePath = axios.create({baseURL: `https://argos-dev-e2meo7r36a-ew.a.run.app/api/v1`});

export interface LoggedUser {
  isLogged: boolean,
  user: User
}

export interface User {
  name?: string,
  surname?: string,
  devices?: Device[] | null,
}

export interface Device {
  id?: string,
  name?: string,
  code?: string,
  ip?: string,
  mac?: string,
  timing?: number,
  data?: Data[] | null,
}

export interface Data {

}


export const defaultLoggedUser: LoggedUser = {isLogged: false, user: {}};

