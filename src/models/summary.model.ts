import { Entity, model, property, hasMany } from '@loopback/repository';
import { Detail } from './detail.model';
import uuid = require('uuid');

@model({ settings: { strict: false } })
export class Summary extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  age?: number;

  @hasMany(() => Detail)
  details: Detail[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Summary>) {
    super(data);
  }
}

export interface SummaryRelations {
  // describe navigational properties here
}

export type SummaryWithRelations = Summary & SummaryRelations;
