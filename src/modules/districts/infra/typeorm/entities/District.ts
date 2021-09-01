/* eslint-disable camelcase */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { v4 as uuid } from 'uuid';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';

@Entity('districts')
class District {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'name_custom' })
  nameCustom(): string {
    return `#${this.name}`;
  }

  @Column({ width: 256, nullable: true })
  image: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { District };
