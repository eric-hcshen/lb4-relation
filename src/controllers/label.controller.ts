import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Label } from '../models';
import { LabelRepository } from '../repositories';

export class LabelController {
  constructor(
    @repository(LabelRepository)
    public labelRepository: LabelRepository,
  ) { }
  /*
    @post('/labels', {
      responses: {
        '200': {
          description: 'Label model instance',
          content: {'application/json': {schema: getModelSchemaRef(Label)}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Label, {
              title: 'NewLabel',
  
            }),
          },
        },
      })
      label: Label,
    ): Promise<Label> {
      return this.labelRepository.set();
    }
  
    @get('/labels/count', {
      responses: {
        '200': {
          description: 'Label model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(Label)) where?: Where<Label>,
    ): Promise<Count> {
      return this.labelRepository.count(where);
    }
  
    @get('/labels', {
      responses: {
        '200': {
          description: 'Array of Label model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: getModelSchemaRef(Label)},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(Label)) filter?: Filter<Label>,
    ): Promise<Label[]> {
      return this.labelRepository.find(filter);
    }
  
    @patch('/labels', {
      responses: {
        '200': {
          description: 'Label PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Label, {partial: true}),
          },
        },
      })
      label: Label,
      @param.query.object('where', getWhereSchemaFor(Label)) where?: Where<Label>,
    ): Promise<Count> {
      return this.labelRepository.updateAll(label, where);
    }
  */
  @get('/labels/{id}', {
    responses: {
      '200': {
        description: 'Label model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Label) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Label> {
    return this.labelRepository.get(id);
  }

  @patch('/labels/{id}', {
    responses: {
      '204': {
        description: 'Label PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Label, { partial: true }),
        },
      },
    })
    label: Label,
  ): Promise<void> {
    await this.labelRepository.set(id, label);
  }

  @put('/labels/{id}', {
    responses: {
      '204': {
        description: 'Label PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() label: Label,
  ): Promise<void> {
    await this.labelRepository.set(id, label);
  }

  @del('/labels/{id}', {
    responses: {
      '204': {
        description: 'Label DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.labelRepository.delete(id);
  }
}
