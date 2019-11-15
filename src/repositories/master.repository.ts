import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Master, MasterRelations, Detail} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DetailRepository} from './detail.repository';

export class MasterRepository extends DefaultCrudRepository<
  Master,
  typeof Master.prototype.id,
  MasterRelations
> {

  public readonly details: HasManyRepositoryFactory<Detail, typeof Master.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetailRepository') protected detailRepositoryGetter: Getter<DetailRepository>,
  ) {
    super(Master, dataSource);
    this.details = this.createHasManyRepositoryFactoryFor('details', detailRepositoryGetter,);
    this.registerInclusionResolver('details', this.details.inclusionResolver);
  }
}
