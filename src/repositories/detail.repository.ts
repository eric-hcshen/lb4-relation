import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Detail, DetailRelations, Master, Summary} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MasterRepository} from './master.repository';
import {SummaryRepository} from './summary.repository';

export class DetailRepository extends DefaultCrudRepository<
  Detail,
  typeof Detail.prototype.id,
  DetailRelations
> {

  public readonly master: BelongsToAccessor<Master, typeof Detail.prototype.id>;

  public readonly summary: BelongsToAccessor<Summary, typeof Detail.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MasterRepository') protected masterRepositoryGetter: Getter<MasterRepository>, @repository.getter('SummaryRepository') protected summaryRepositoryGetter: Getter<SummaryRepository>,
  ) {
    super(Detail, dataSource);
    this.summary = this.createBelongsToAccessorFor('summary', summaryRepositoryGetter,);
    this.registerInclusionResolver('summary', this.summary.inclusionResolver);
    this.master = this.createBelongsToAccessorFor('master', masterRepositoryGetter,);
    this.registerInclusionResolver('master', this.master.inclusionResolver);
  }
}
