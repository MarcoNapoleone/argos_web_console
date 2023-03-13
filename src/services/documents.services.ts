import {Id, UUID} from "./entities";
import {servicePath} from "./connectors/axios";
import {getCookie} from "./connectors/cookies";
import {getModuleByName} from "./modules.services";

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

export async function getDocumentById(documentId: Id): Promise<Document> {
    let data = {};
    await servicePath
      .get(`documents/${documentId}`, {
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

export async function getDocumentsByRefId(refId: Id, moduleName: string): Promise<Document[]> {
  let data = [];
  const {id} = await getModuleByName(moduleName);
  await servicePath
    .get(`/documents?refId=${refId}&moduleId=${id}`, {
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

export async function createDocument(companyId: Id, refId: Id, moduleName: string, document: Document): Promise<Document> {
  let data = {};
  const {id} = await getModuleByName(moduleName);
  await servicePath
    .post(`/documents?companyId=${companyId}&refId=${refId}&moduleId=${id}`, {
      ...document
    }, {
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

