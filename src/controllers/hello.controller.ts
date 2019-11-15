// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

import { get } from '@loopback/rest';

export class HelloController {
  constructor() { }
  @get('/greet', {
    parameters: [{ name: 'name', schema: { type: 'string' }, in: 'query' }],
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    },
  })
  greet(name: string) {
    return `hello ${name}`;
  }
}
