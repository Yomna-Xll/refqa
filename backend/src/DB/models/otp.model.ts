// src/db/models/otp.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './user.model';
import { OtpEnum } from '../../common/enums/otp.enums';


@Entity({ name: 'otps' })
@Index(['code', 'type', 'isUsed'])
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({ type: 'enum', enum: OtpEnum, default: OtpEnum.confirmEmail })
  type: OtpEnum;

  @Column({ default: false, type: 'boolean' })
  isUsed: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @Column({ name: 'reset_token_used', type: 'boolean', default: false })
resetTokenUsed: boolean;
}