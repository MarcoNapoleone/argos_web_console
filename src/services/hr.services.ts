import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import {AxiosResponse} from "axios";

export class HR {
  id?: Id;
  uuid?: UUID;
  name?: string;
  surname?: string;
  fiscalCode?: string;
  email?: string;
  phone?: string;
  birthPlace?: string;
  birthDate?: Date;
  nationality?: string;
  recruitmentDate?: Date;
  contractQualification?: string;
  contractLevel?: string;
  duty?: string;
  isApprentice?: boolean;
  isProfessional?: boolean;
  isItOrganigrammaSicurezza?: boolean;
  itCcnl?: string;
  address?: string;
  municipality?: string;
  province?: string;
  postalCode?: string;
  country?: string;
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

export async function createHR(companyId: Id, hr: HR): Promise<HR> {
  let data = {};
  await servicePath
    .post(`/hr`, {...hr, "companyId": companyId}, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 201) {
        return new Error(res.data["message"])
      }
      data = res.data
    })
  return data;
}

export async function updateHR(hrId: Id, hr: HR): Promise<AxiosResponse> {
  let data = {} as AxiosResponse;
  await servicePath
    .put(`/hr/${hrId}`, hr, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      data = res.data
    }
  )
  return data;
}

export async function deleteHR(hrId: Id): Promise<AxiosResponse> {
  let data = {} as AxiosResponse;
  await servicePath
    .delete(`/hr/${hrId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      data = res.data
    }
  )
  return data;
}