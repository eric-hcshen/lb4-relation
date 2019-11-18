import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Summary, SummaryRelations, Detail} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DetailRepository} from './detail.repository';

export class SummaryRepository extends DefaultCrudRepository<
  Summary,
  typeof Summary.prototype.id,
  SummaryRelations
> {

  public readonly details: HasManyRepositoryFactory<Detail, typeof Summary.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetailRepository') protected detailRepositoryGetter: Getter<DetailRepository>,
  ) {
    super(Summary, dataSource);
    this.details = this.createHasManyRepositoryFactoryFor('details', detailRepositoryGetter,);
    this.registerInclusionResolver('details', this.details.inclusionResolver);
  }
}
