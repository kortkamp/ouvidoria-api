/* eslint-disable camelcase */
import { Exclude } from 'class-transformer';
import {
  Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

// import { v4 as uuid } from 'uuid';
import { Answer } from '@modules/answers/infra/typeorm/entities/Answer';
import { District } from '@modules/districts/infra/typeorm/entities/District';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('complaints')
class Complaint {
  // @PrimaryColumn()
  // readonly id: string;

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number;

  @Exclude()
  @Column()
  user_sender: string;

  @ManyToOne(() => User, (user) => user.name, { eager: true })
  @JoinColumn({ name: 'user_sender' })
  user: User;

  @Exclude()
  @Column()
  district_id:string;

  @ManyToOne(() => District, (district) => district, { eager: true })
  @JoinColumn({ name: 'district_id' })
  districtData: District;

  @OneToMany(() => Answer, (answers) => answers.complaint, { eager: true })
  @JoinColumn({ name: 'id' })
  answers: Answer[];

  @Column({
    length: 1000,
  })
  message: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  solved: boolean;

  @CreateDateColumn()
  created_at: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}

export { Complaint };
