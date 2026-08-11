
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({ name: 'oauth_accounts' })
export class OauthAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  provider: string;

  @Column({ name: 'provider_user_id', type: 'varchar', unique: true, nullable: false })
  providerUserId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}