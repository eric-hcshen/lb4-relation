import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Detail, DetailRelations, Master} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MasterRepository} from './master.repository';

export class DetailRepository extends DefaultCrudRepository<
  Detail,
  typeof Detail.prototype.id,
  DetailRelations
> {

  public readonly master: BelongsToAccessor<Master, typeof Detail.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MasterRepository') protected masterRepositoryGetter: Getter<MasterRepository>,
  ) {
    super(Detail, dataSource);
    this.master = this.createBelongsToAccessorFor('master', masterRepositoryGetter,);
    this.registerInclusionResolver('master', this.master.inclusionResolver);
  }
}
