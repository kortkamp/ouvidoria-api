/* eslint-disable camelcase */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { District } from './District';
import { User } from './User';

@Entity('compliments')
class Complaint {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: string;

  @Column()
  district_id:string;

  @JoinColumn({ name: 'district_id' })
  @ManyToOne(() => District)
  district: District;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Complaint };