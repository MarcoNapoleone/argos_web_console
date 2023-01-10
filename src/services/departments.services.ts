import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

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