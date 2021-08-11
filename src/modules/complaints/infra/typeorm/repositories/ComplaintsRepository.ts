/* eslint-disable camelcase */
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

  public async findById(id:string):Promise<Complaint | undefined> {
    const complaintFound = await this.ormRepository.findOne({
      where: { id },
    });
    return complaintFound;
  }

  public async delete(id:string):Promise<void> {
    const complaint = await this.findById(id);
    if (complaint) {
      await this.ormRepository.remove(complaint);
    }
  }

  public async listAll():Promise<Complaint[]> {
    const complaints = await this.ormRepository.find();
    return complaints;
  }
}

export default ComplaintsRepository;
