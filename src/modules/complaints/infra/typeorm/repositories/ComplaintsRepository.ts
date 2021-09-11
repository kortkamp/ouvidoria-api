/* eslint-disable camelcase */
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import IComplaintRepository from '@modules/complaints/repositories/IComplaintsRepository';
import { getRepository, Repository } from 'typeorm';

import { Complaint } from '../entities/Complaint';

interface IComplaintsPaginated {
  complaints:Complaint[];
  total: number;
}

interface IPage {
  take:number;
  skip:number;
}

class ComplaintsRepository implements IComplaintRepository {
  private ormRepository: Repository<Complaint>;

  constructor() {
    this.ormRepository = getRepository(Complaint);
  }

  public async create({
    district_id,
    user_sender,
    message,
    image,
  }:ICreateComplaintDTO):Promise<Complaint> {
    const complaint = this.ormRepository.create({
      district_id,
      user_sender,
      message,
      image,
    });
    await this.ormRepository.save(complaint);
    return complaint;
  }

  public async update(complaint:Complaint): Promise<void> {
    await this.ormRepository.save(complaint);
  }

  public async findById(id:number):Promise<Complaint | undefined> {
    const complaintFound = await this.ormRepository.findOne({
      where: { id },
    });
    return complaintFound;
  }

  public async delete(id:number):Promise<void> {
    const complaint = await this.findById(id);
    if (complaint) {
      await this.ormRepository.remove(complaint);
    }
  }

  public async listAll():Promise<Complaint[]> {
    const complaints = await this.ormRepository.find();
    return complaints;
  }

  public async listByDistrict(
    district_id:string,
    { take, skip }:IPage,
  ):Promise<IComplaintsPaginated> {
    const [complaints, total] = await this.ormRepository.findAndCount({
      where: { district_id },
      take,
      skip,
      order: { created_at: 'DESC' },
    });
    return {
      complaints,
      total,
    };
  }

  public async listByUser(
    sender_id:string,
    { take, skip }:IPage,
  ):Promise<IComplaintsPaginated> {
    const [complaints, total] = await this.ormRepository.findAndCount({
      where: { user_sender: sender_id },
      take,
      skip,
      order: { created_at: 'DESC' },
    });
    return {
      complaints,
      total,
    };
  }
}

export default ComplaintsRepository;
