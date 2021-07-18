/* eslint-disable camelcase */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Complaint } from './Complaint';
import { User } from './User';

@Entity('answers')
class Answer {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: string;

  @Column()
  complaint_id:string;

  @JoinColumn({ name: 'complaint_id' })
  @ManyToOne(() => Complaint)
  complaint: Complaint;

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

export { Answer };
