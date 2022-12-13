import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class Company {

  id?: Id;

  uuid?: UUID;

  name?: string;

  createdAt?: Date;

  deletedAt?: Date;

  version?: number;

  updatedAt?: Date;

}

export const defaultCompanies: Company[] = [];
export const defaultCompany: Company = {};

export async function getAllCompanies(): Promise<Company[]> {
  let data = [];
  await servicePath
      .get('/companies', {
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