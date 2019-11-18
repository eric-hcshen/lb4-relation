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
import {Summary} from '../models';
import {SummaryRepository} from '../repositories';

export class SummaryController {
  constructor(
    @repository(SummaryRepository)
    public summaryRepository : SummaryRepository,
  ) {}

  @post('/summaries', {
    responses: {
      '200': {
        description: 'Summary model instance',
        content: {'application/json': {schema: getModelSchemaRef(Summary)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Summary, {
            title: 'NewSummary',
            exclude: ['id'],
          }),
        },
      },
    })
    summary: Omit<Summary, 'id'>,
  ): Promise<Summary> {
    return this.summaryRepository.create(summary);
  }

  @get('/summaries/count', {
    responses: {
      '200': {
        description: 'Summary model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Summary)) where?: Where<Summary>,
  ): Promise<Count> {
    return this.summaryRepository.count(where);
  }

  @get('/summaries', {
    responses: {
      '200': {
        description: 'Array of Summary model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Summary)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Summary)) filter?: Filter<Summary>,
  ): Promise<Summary[]> {
    return this.summaryRepository.find(filter);
  }

  @patch('/summaries', {
    responses: {
      '200': {
        description: 'Summary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Summary, {partial: true}),
        },
      },
    })
    summary: Summary,
    @param.query.object('where', getWhereSchemaFor(Summary)) where?: Where<Summary>,
  ): Promise<Count> {
    return this.summaryRepository.updateAll(summary, where);
  }

  @get('/summaries/{id}', {
    responses: {
      '200': {
        description: 'Summary model instance',
        content: {'application/json': {schema: getModelSchemaRef(Summary)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Summary> {
    return this.summaryRepository.findById(id);
  }

  @patch('/summaries/{id}', {
    responses: {
      '204': {
        description: 'Summary PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Summary, {partial: true}),
        },
      },
    })
    summary: Summary,
  ): Promise<void> {
    await this.summaryRepository.updateById(id, summary);
  }

  @put('/summaries/{id}', {
    responses: {
      '204': {
        description: 'Summary PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() summary: Summary,
  ): Promise<void> {
    await this.summaryRepository.replaceById(id, summary);
  }

  @del('/summaries/{id}', {
    responses: {
      '204': {
        description: 'Summary DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.summaryRepository.deleteById(id);
  }
}
