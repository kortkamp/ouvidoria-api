import { v4 as uuid } from 'uuid';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';

class FakeComplaintsRepository implements IComplaintsRepository {
  private complaints:Complaint[] = [];

  public async create({
    district_id,
    user_sender,
    message,
  }:ICreateComplaintDTO): Promise<Complaint> {
    const complaint = new Complaint();
    Object.assign(complaint, {
      id: uuid(),
      district_id,
      user_sender,
      message,
    });

    this.complaints.push(complaint);

    return complaint;
  }

  public async findById(id:string):Promise<Complaint | undefined> {
    const district = this.complaints.find((complaint) => complaint.id === id);

    return district;
  }

  public async listAll():Promise<Complaint[]> {
    return this.complaints;
  }
}

export default FakeComplaintsRepository;
