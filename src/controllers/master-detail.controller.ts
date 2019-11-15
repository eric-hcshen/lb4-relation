import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Master,
  Detail,
} from '../models';
import {MasterRepository} from '../repositories';

export class MasterDetailController {
  constructor(
    @repository(MasterRepository) protected masterRepository: MasterRepository,
  ) { }

  @get('/masters/{id}/details', {
    responses: {
      '200': {
        description: 'Array of Detail\'s belonging to Master',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detail>,
  ): Promise<Detail[]> {
    return this.masterRepository.details(id).find(filter);
  }

  @post('/masters/{id}/details', {
    responses: {
      '200': {
        description: 'Master model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Master.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {
            title: 'NewDetailInMaster',
            exclude: ['id'],
            optional: ['masterId']
          }),
        },
      },
    }) detail: Omit<Detail, 'id'>,
  ): Promise<Detail> {
    return this.masterRepository.details(id).create(detail);
  }

  @patch('/masters/{id}/details', {
    responses: {
      '200': {
        description: 'Master.Detail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {partial: true}),
        },
      },
    })
    detail: Partial<Detail>,
    @param.query.object('where', getWhereSchemaFor(Detail)) where?: Where<Detail>,
  ): Promise<Count> {
    return this.masterRepository.details(id).patch(detail, where);
  }

  @del('/masters/{id}/details', {
    responses: {
      '200': {
        description: 'Master.Detail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detail)) where?: Where<Detail>,
  ): Promise<Count> {
    return this.masterRepository.details(id).delete(where);
  }
}
