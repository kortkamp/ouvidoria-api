import { v4 as uuid } from 'uuid';
import { District } from '@modules/districts/infra/typeorm/entities/District';
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';

class FakeDistrictsRepository implements IDistrictsRepository {
  private districts:District[] = [];

  public async create(name: string): Promise<District> {
    const district = new District();
    Object.assign(district, {
      id: uuid(),
      name,
    });

    this.districts.push(district);
    return district;
  }

  public async findById(id:string):Promise<District | undefined> {
    const districtFound = this.districts.find((district) => district.id === id);

    return districtFound;
  }

  public async findWithRelations(id:string, relation:string):Promise<District | undefined> {
    const districtFound = this.districts.find((district) => district.id === id);

    return districtFound;
  }

  public async findByName(name:string):Promise<District | undefined> {
    const districtFound = this.districts.find((district) => district.name === name);

    return districtFound;
  }

  public async listAll():Promise<District[]> {
    return this.districts;
  }
}

export default FakeDistrictsRepository;
