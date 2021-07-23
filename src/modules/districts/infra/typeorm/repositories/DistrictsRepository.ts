import IDistrictRepository from '@modules/districts/repositories/IDistrictRepository';
import { getRepository, Repository } from 'typeorm';
import { District } from '../entities/District';

class DistrictsRepository implements IDistrictRepository {
  private ormRepository: Repository<District>;

  constructor() {
    this.ormRepository = getRepository(District);
  }

  public async create(name:string):Promise<District> {
    const district = this.ormRepository.create({ name });

    await this.ormRepository.save(district);
    return district;
  }

  public async findById(id:string):Promise<District | undefined> {
    const districtFound = await this.ormRepository.findOne({
      where: { id },
    });
    return districtFound;
  }

  public async findWithRelations(id:string, relation:string):Promise<District | undefined> {
    const districtFound = await this.ormRepository.findOne({
      where: { id },
      relations: [relation],
    });
    return districtFound;
  }

  public async findByName(name:string):Promise<District | undefined> {
    const districtFound = await this.ormRepository.findOne({
      where: { name },
    });
    return districtFound;
  }

  public async listAll():Promise<District[]> {
    const districts = await this.ormRepository.find();
    return districts;
  }
}

export default DistrictsRepository;
