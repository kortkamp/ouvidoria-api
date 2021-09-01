/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Exclude } from 'class-transformer';

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
