// src/DB/repository/oauth-account.repo.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbRepository } from './db.repository';
import { OauthAccount } from '../models/oauth-account.model';

@Injectable()
export class OauthAccountRepository extends DbRepository<OauthAccount> {
  constructor(
    @InjectRepository(OauthAccount) repo: Repository<OauthAccount>,
  ) {
    super(repo);
  }
}