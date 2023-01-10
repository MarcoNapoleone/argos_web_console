import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class Property {
  id?: Id;
  uuid?: UUID;
  name?: string;
  address?: string;
  phone?: string;
  companyId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultProperties: Property[] = [];
export const defaultDepartment: Property = {};

export async function getAllProperties(companyId: Id): Promise<Property[]> {
  let data = [];
  await servicePath
    .get(`/companies/${companyId}/properties`, {
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

export async function getProperty(propertyId: Id): Promise<Property> {
    let data = {};
    await servicePath
      .get(`/properties/${propertyId}`, {
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