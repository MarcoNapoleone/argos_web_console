import {Id, UUID} from "./entities";

export class Vehicle {
  id?: Id;
  uuid?: UUID;
  hrId?: Id;
  localUnitId?: Id;
  name?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  licensePlate?: string;
  category?: string;
  owner?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultVehicles: Vehicle[] = [];
export const defaultVehicle: Vehicle = {};