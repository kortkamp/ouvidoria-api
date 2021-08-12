/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';

interface IComplaintsRepository {
  create(complaint: ICreateComplaintDTO): Promise<Complaint>;
  findById(id:string):Promise<Complaint | undefined>;
  delete(id:string):Promise<void>;
  listAll():Promise<Complaint[]>;
  listByUser(user:string):Promise<Complaint[]>;
}

export default IComplaintsRepository;
