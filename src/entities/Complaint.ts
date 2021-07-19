/* eslint-disable camelcase */
import { Exclude } from 'class-transformer';
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Answer } from './Answer';
import { District } from './District';
import { User } from './User';

@Entity('complaints')
class Complaint {
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
  district_id:string;

  @ManyToOne(() => District, (district) => district.complaints)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => Answer, (answers) => answers.complaint, { eager: true })
  @JoinColumn({ name: 'id' })
  answers: Answer[];

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
