import { FindOperator } from 'typeorm';

export default interface IFindDTO {
  filter: {
    district_id?:string;
    user_sender?:string;
    message?:FindOperator<string>;
  }
  take:number;
  skip:number;
}
