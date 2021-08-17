/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Exclude } from 'class-transformer';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';

@Entity('users')
class User {
  @Exclude()
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  email: string;

  @Column()
  admin:boolean;

  @Exclude()
  @Column()
  password:string;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  @JoinColumn({ name: 'id' })
  complaints: Complaint[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
