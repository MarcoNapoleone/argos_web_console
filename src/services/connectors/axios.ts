import axios from "axios";

export const podServicePath = axios.create({baseURL: `https://argos-iot.com/webservice`});
export const servicePath = axios.create({baseURL: `https://argos-dev-e2meo7r36a-ew.a.run.app/api/v1`});

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


