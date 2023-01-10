import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class HR {
  id?: Id;
  uuid?: UUID;
  name?: string;
  surname?: string;
  departmentId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultHRs: HR[] = [];
export const defaultHR: HR = {};

export async function getAllHR(companyId: Id): Promise<HR[]> {
  let data = [];
  await servicePath
    .get(`/companies/${companyId}/hr`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      data = res.data
    })
  return data;
}

export async function getHR(hrId: Id): Promise<HR> {
    let data = {};
    await servicePath
      .get(`/hr/${hrId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      })
      .then(res => {
        if (res.status !== 200) {
          return new Error(res.data["message"])
        }
        data = res.data
      })
    return data;
}