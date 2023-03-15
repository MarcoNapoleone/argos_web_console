import {Id, UUID} from "../entities/entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";

export class Document {
  id?: Id;
  uuid?: UUID;
  name?: string;
  companyId?: Id;
  path?: string;
  refId?: Id;
  description?: string;
  moduleId?: Id;
  fileType?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultDocuments: Document[] = [];
export const defaultDocument: Document = {};

export async function getAllDocuments(companyId: Id): Promise<Document[]> {
  let data = [];
  await servicePath
    .get(`/companies/${companyId}/documents`, {
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

export async function getDocument(documentId: Id): Promise<Document> {
    let data = {};
    await servicePath
      .get(`/departments/${documentId}`, {
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