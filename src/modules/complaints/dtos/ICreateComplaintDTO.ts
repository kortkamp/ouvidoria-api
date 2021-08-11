export default interface ICreateComplaintDTO {
  district_id: string;
  user_sender:string;
  message: string;
  image?:string;
}
