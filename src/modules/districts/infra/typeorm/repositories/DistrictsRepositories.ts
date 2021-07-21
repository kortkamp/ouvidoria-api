import { EntityRepository, Repository } from 'typeorm';
import { District } from '../entities/District';

@EntityRepository(District)
class DistrictsRepositories extends Repository<District> {

}

export { DistrictsRepositories };
