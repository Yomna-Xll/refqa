// src/DB/repository/refresh-token.repo.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbRepository } from './db.repository';
import { RefreshToken } from '../models/RefreshToken.model';

@Injectable()
export class RefreshTokenRepository extends DbRepository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken) repo: Repository<RefreshToken>,
  ) {
    super(repo);
  }
}