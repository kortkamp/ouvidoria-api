export default interface ICreateUserDTO {
  name: string;
  email: string;
  admin?: boolean;
  password:string;

};
