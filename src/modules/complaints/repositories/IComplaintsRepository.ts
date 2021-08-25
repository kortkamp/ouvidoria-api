/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';

interface IComplaintsPaginated {
  total: number;
  complaints:Complaint[];
}

interface IPage {
  take:number;
  skip:number;
}

interface IComplaintsRepository {
  create(complaint: ICreateComplaintDTO): Promise<Complaint>;
  findById(id:string):Promise<Complaint | undefined>;
  delete(id:string):Promise<void>;
  listAll():Promise<Complaint[]>;
  listByUser(user:string):Promise<Complaint[]>;
  listByDistrict(district_id:string, page:IPage):Promise<IComplaintsPaginated>;
}

export default IComplaintsRepository;
