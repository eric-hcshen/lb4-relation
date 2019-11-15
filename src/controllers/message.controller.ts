// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get, getModelSchemaRef } from '@loopback/rest';
import { Message } from '../models/message.model'

export class MessageController {
  constructor() { }
  @get('/message', {
    parameters: [{ name: 'name', schema: { type: 'string' }, in: 'query' }],
    responses: {
      '200': {
        description: 'Message model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Message) },
          },
        },
      },
    },
  })
  find(
    name: string
  ): Message {
    const mes = new Message;
    mes.myNum = 23;
    mes.myStr = name;
    return mes;
  }
}
