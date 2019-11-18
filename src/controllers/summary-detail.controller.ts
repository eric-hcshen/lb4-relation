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
  Summary,
  Detail,
} from '../models';
import {SummaryRepository} from '../repositories';

export class SummaryDetailController {
  constructor(
    @repository(SummaryRepository) protected summaryRepository: SummaryRepository,
  ) { }

  @get('/summaries/{id}/details', {
    responses: {
      '200': {
        description: 'Array of Detail\'s belonging to Summary',
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
    return this.summaryRepository.details(id).find(filter);
  }

  @post('/summaries/{id}/details', {
    responses: {
      '200': {
        description: 'Summary model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Summary.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {
            title: 'NewDetailInSummary',
            exclude: ['id'],
            optional: ['summaryId']
          }),
        },
      },
    }) detail: Omit<Detail, 'id'>,
  ): Promise<Detail> {
    return this.summaryRepository.details(id).create(detail);
  }

  @patch('/summaries/{id}/details', {
    responses: {
      '200': {
        description: 'Summary.Detail PATCH success count',
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
    return this.summaryRepository.details(id).patch(detail, where);
  }

  @del('/summaries/{id}/details', {
    responses: {
      '200': {
        description: 'Summary.Detail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detail)) where?: Where<Detail>,
  ): Promise<Count> {
    return this.summaryRepository.details(id).delete(where);
  }
}
