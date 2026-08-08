import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OnboardingStage, RoleType } from "../../common/enums/user.enum";
import { Otp } from "./otp.model";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.STUDENT,
  })
  role: RoleType;

  @Column({
    name: 'onboarding_stage',
    type: 'enum',
    enum: OnboardingStage,
    default: OnboardingStage.REGISTERED,
  })
  onboardingStage: OnboardingStage;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

@OneToMany(() => Otp, (otp) => otp.user)
otps: Otp[];
}