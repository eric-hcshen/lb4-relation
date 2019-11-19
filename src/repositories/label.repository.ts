import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {Label} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LabelRepository extends DefaultKeyValueRepository<
  Label
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(Label, dataSource);
  }
}
