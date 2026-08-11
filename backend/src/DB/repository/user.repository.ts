import { Injectable } from "@nestjs/common";
import { DbRepository } from "./db.repository";
import { User } from "../models/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends DbRepository<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
}