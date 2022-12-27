import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class LocalUnit {
  id?: Id;
  uuid?: UUID;
  name?: string;
  email?: string;
  address?: string;
  municipality?: string;
  postalCode?: string;
  phone?: string;
  companyId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultLocalUnits: LocalUnit[] = [];
export const defaultLocalUnit: LocalUnit = {};

export async function getAllLocalUnits(companyId: Id): Promise<LocalUnit[]> {
  let data = [];
  await servicePath
    .get(`/companies/${companyId}/local-units`, {
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

export async function getLocalUnit(localUnitId: Id): Promise<LocalUnit> {
    let data = {};
    await servicePath
      .get(`/local-units/${localUnitId}`, {
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