import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detail,
  Summary,
} from '../models';
import {DetailRepository} from '../repositories';

export class DetailSummaryController {
  constructor(
    @repository(DetailRepository)
    public detailRepository: DetailRepository,
  ) { }

  @get('/details/{id}/summary', {
    responses: {
      '200': {
        description: 'Summary belonging to Detail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Summary)},
          },
        },
      },
    },
  })
  async getSummary(
    @param.path.string('id') id: typeof Detail.prototype.id,
  ): Promise<Summary> {
    return this.detailRepository.summary(id);
  }
}
