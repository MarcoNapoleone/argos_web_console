import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import {AxiosResponse} from "axios";

export class Department {
  id?: Id;
  uuid?: UUID;
  name?: string;
  localUnitId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultDepartments: Department[] = [];
export const defaultDepartment: Department = {};

export async function getAllDepartments(companyId: Id): Promise<Department[]> {
  let data = [];
  await servicePath
    .get(`/companies/${companyId}/departments`, {
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

export async function getDepartment(departmentId: Id): Promise<Department> {
    let data = {};
    await servicePath
      .get(`/departments/${departmentId}`, {
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

export async function createDepartment(companyId: Id, department: Department): Promise<Department> {
  let data = {};
  await servicePath
    .post(`/departments`, {...department, "companyId": companyId}, {
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

export async function updateDepartment(id: Id, department: Department): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .put(`/departments/${id}`, department, {
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

export async function deleteDepartment(id: Id): Promise<AxiosResponse> {
  let response = {} as AxiosResponse;
  await servicePath
    .delete(`/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    .then(res => {
      if (res.status !== 204) {
        return new Error(res.data["message"])
      }
      response = res
    })
  return response;
}

