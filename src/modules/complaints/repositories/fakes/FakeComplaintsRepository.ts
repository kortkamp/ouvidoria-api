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
    image,
  }:ICreateComplaintDTO): Promise<Complaint> {
    const complaint = new Complaint();
    Object.assign(complaint, {
      id: uuid(),
      district_id,
      user_sender,
      message,
      image,
    });

    this.complaints.push(complaint);

    return complaint;
  }

  public async findById(id:string):Promise<Complaint | undefined> {
    const district = this.complaints.find((complaint) => complaint.id === id);

    return district;
  }

  public async delete(id:string):Promise<void> {
    this.complaints.filter((complaint) => complaint.id !== id);
  }

  public async listAll():Promise<Complaint[]> {
    return this.complaints;
  }

  public async listByUser(user:string):Promise<Complaint[]> {
    const filteredComplaints = this.complaints.filter(
      (complaint) => complaint.user_sender === user,
    );
    return filteredComplaints;
  }
}

export default FakeComplaintsRepository;
