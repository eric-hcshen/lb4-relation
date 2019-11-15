import { Entity, model, property, hasMany } from '@loopback/repository';
import { Detail } from './detail.model';
import { v4 as uuid } from 'uuid';

@model({ settings: { strict: false } })
export class Master extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  master_name: string;

  @hasMany(() => Detail)
  details: Detail[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Master>) {
    super(data);
  }
}

export interface MasterRelations {
  // describe navigational properties here
}

export type MasterWithRelations = Master & MasterRelations;
