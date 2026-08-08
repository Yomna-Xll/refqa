import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { Logger, OnModuleInit } from '@nestjs/common';

@Processor('emailQueue')
export class EmailProcessor extends WorkerHost implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(EmailProcessor.name);

  onModuleInit() {
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error('EMAIL and EMAIL_PASSWORD env vars are required');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async process(job: Job) {
    const { to, subject, html } = job.data;

    try {
      const info = await this.transporter.sendMail({
        from: `"Refqa" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent to ${to} — ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }
}
