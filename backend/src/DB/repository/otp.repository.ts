import { Injectable } from "@nestjs/common";
import { DbRepository } from "./db.repository";
import { User } from "../models/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "../models/otp.model";

@Injectable()
export class OtpRepository extends DbRepository<Otp> {
  constructor(@InjectRepository(Otp) repo: Repository<Otp>) {
    super(repo);
  }
}