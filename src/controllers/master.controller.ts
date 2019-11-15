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
import {Master} from '../models';
import {MasterRepository} from '../repositories';

export class MasterController {
  constructor(
    @repository(MasterRepository)
    public masterRepository : MasterRepository,
  ) {}

  @post('/masters', {
    responses: {
      '200': {
        description: 'Master model instance',
        content: {'application/json': {schema: getModelSchemaRef(Master)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Master, {
            title: 'NewMaster',
            exclude: ['id'],
          }),
        },
      },
    })
    master: Omit<Master, 'id'>,
  ): Promise<Master> {
    return this.masterRepository.create(master);
  }

  @get('/masters/count', {
    responses: {
      '200': {
        description: 'Master model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Master)) where?: Where<Master>,
  ): Promise<Count> {
    return this.masterRepository.count(where);
  }

  @get('/masters', {
    responses: {
      '200': {
        description: 'Array of Master model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Master)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Master)) filter?: Filter<Master>,
  ): Promise<Master[]> {
    return this.masterRepository.find(filter);
  }

  @patch('/masters', {
    responses: {
      '200': {
        description: 'Master PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Master, {partial: true}),
        },
      },
    })
    master: Master,
    @param.query.object('where', getWhereSchemaFor(Master)) where?: Where<Master>,
  ): Promise<Count> {
    return this.masterRepository.updateAll(master, where);
  }

  @get('/masters/{id}', {
    responses: {
      '200': {
        description: 'Master model instance',
        content: {'application/json': {schema: getModelSchemaRef(Master)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Master> {
    return this.masterRepository.findById(id);
  }

  @patch('/masters/{id}', {
    responses: {
      '204': {
        description: 'Master PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Master, {partial: true}),
        },
      },
    })
    master: Master,
  ): Promise<void> {
    await this.masterRepository.updateById(id, master);
  }

  @put('/masters/{id}', {
    responses: {
      '204': {
        description: 'Master PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() master: Master,
  ): Promise<void> {
    await this.masterRepository.replaceById(id, master);
  }

  @del('/masters/{id}', {
    responses: {
      '204': {
        description: 'Master DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.masterRepository.deleteById(id);
  }
}
