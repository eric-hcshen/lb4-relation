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
  Master,
} from '../models';
import {DetailRepository} from '../repositories';

export class DetailMasterController {
  constructor(
    @repository(DetailRepository)
    public detailRepository: DetailRepository,
  ) { }

  @get('/details/{id}/master', {
    responses: {
      '200': {
        description: 'Master belonging to Detail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Master)},
          },
        },
      },
    },
  })
  async getMaster(
    @param.path.string('id') id: typeof Detail.prototype.id,
  ): Promise<Master> {
    return this.detailRepository.master(id);
  }
}
