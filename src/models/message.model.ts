import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Message extends Model {
  @property({
    type: 'string',
    required: true,
  })
  myStr: string;

  @property({
    type: 'number',
    required: true,
  })
  myNum: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}

export interface MessageRelations {
  // describe navigational properties here
}

export type MessageWithRelations = Message & MessageRelations;
