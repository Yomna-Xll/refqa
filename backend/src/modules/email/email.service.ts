import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EmailTemplate } from './templetes/email.templets';
import { User } from '../../DB/models/user.model';


const JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 },
  removeOnComplete: true,
  removeOnFail: false,
};

@Injectable()
export class EmailService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

async sendWelcomeEmail(user: User) {
  const html = EmailTemplate({
    title: 'Welcome to Refqa',
    description: `Hello ${user.fullName}, your campus ride is now organised.`,
  });

  await this.emailQueue.add(
    'sendWelcomeEmail',
    { to: user.email, subject: 'Welcome to Refqa', html },
    JOB_OPTIONS,
  );
}

async sendOtpEmail(email: string, otp: string) {
  const html = EmailTemplate({
    title: 'Verify your email',
    description: 'Enter this code to confirm your Refqa account.',
    otpCode: otp,
  });

  await this.emailQueue.add(
    'sendOtpEmail',
    { to: email, subject: 'Your Refqa verification code', html },
    JOB_OPTIONS,
  );
}
}
