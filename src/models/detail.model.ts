import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Master } from './master.model';
import { v4 as uuid } from 'uuid';
import { Summary } from './summary.model';

@model({settings: {strict: false}})
export class Detail extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
  })
  detail_name?: string;

  @belongsTo(() => Master)
  masterId: string;

  @belongsTo(() => Summary)
  summaryId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Detail>) {
    super(data);
  }
}

export interface DetailRelations {
  // describe navigational properties here
}

export type DetailWithRelations = Detail & DetailRelations;
