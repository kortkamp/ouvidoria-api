/* eslint-disable camelcase */
import { Exclude } from 'class-transformer';
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Answer } from '@modules/answers/infra/typeorm/entities/Answer';
import { District } from '@modules/districts/infra/typeorm/entities/District';
import { User } from '@modules/users/infra/typeorm/entities/User';

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

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Complaint };
