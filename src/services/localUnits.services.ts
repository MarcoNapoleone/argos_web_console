import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import {AxiosResponse} from "axios";
import {Department} from "./departments.services";
import {Vehicle} from "./vehicles.services";

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

export async function createLocalUnit(companyId: Id, localUnit: LocalUnit): Promise<LocalUnit> {
  let data = {};
  await servicePath
    .post(`/local-units`, {...localUnit, "companyId": companyId}, {
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

export async function updateLocalUnit(id: Id, localUnit: LocalUnit): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .put(`/local-units/${id}`, localUnit, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      response = res
    })
  return response;
}

export async function deleteLocalUnit(id: Id): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .delete(`/local-units/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 200) {
        return new Error(res.data["message"])
      }
      response = res
    })
  return response;
}

export async function getAllDepartments(localUnitId: Id): Promise<Department[]> {
  let data = [];
  await servicePath
    .get(`/local-units/${localUnitId}/departments`, {
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

export async function getAllVehicles(localUnitId: Id): Promise<Vehicle[]> {
  let data = [];
  await servicePath
    .get(`/local-units/${localUnitId}/vehicles`, {
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
