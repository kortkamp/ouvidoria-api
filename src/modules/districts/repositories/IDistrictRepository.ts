/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { District } from '@modules/districts/infra/typeorm/entities/District';

interface IUsersRepository {
  create(name: string): Promise<District>;
  findById(id:string):Promise<District | undefined>;
  findWithRelations(id:string, relation:string):Promise<District | undefined>;
  findByName(name:string):Promise<District | undefined>;
  listAll():Promise<District[]>;
}

export default IUsersRepository;
