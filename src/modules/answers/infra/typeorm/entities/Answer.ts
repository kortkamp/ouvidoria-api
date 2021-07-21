/* eslint-disable camelcase */
import { Exclude } from 'class-transformer';
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('answers')
class Answer {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  user_sender: string;

  @ManyToOne(() => User, (user) => user.name, { eager: true })
  @JoinColumn({ name: 'user_sender' })
  user: User;

  @Exclude()
  @Column()
  complaint_id:string;

  @ManyToOne(() => Complaint, (complaint) => complaint.answers)
  @JoinColumn({ name: 'complaint_id' })
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
