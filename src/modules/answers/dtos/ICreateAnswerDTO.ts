export default interface ICreateAnswerDTO {
  complaint_id: number;
  user_sender:string;
  message: string;
  deadline: number;
}
