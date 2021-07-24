/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import IComplaintRepository from '@modules/complaints/repositories/IComplaintsRepository';
import { getRepository, Repository } from 'typeorm';

import { Complaint } from '../entities/Complaint';

class ComplaintsRepository implements IComplaintRepository {
  private ormRepository: Repository<Complaint>;

  constructor() {
    this.ormRepository = getRepository(Complaint);
  }

  public async create({
    district_id,
    user_sender,
    message,
  }:ICreateComplaintDTO):Promise<Complaint> {
    console.log(message);

    const complaint = this.ormRepository.create({
      district_id,
      user_sender,
      message,
    });
    await this.ormRepository.save(complaint);
    return complaint;
  }

  public async findById(id:string):Promise<Complaint | undefined> {
    const complaintFound = await this.ormRepository.findOne({
      where: { id },
    });
    return complaintFound;
  }

  public async listAll():Promise<Complaint[]> {
    const complaints = await this.ormRepository.find();
    return complaints;
  }
}

export default ComplaintsRepository;
