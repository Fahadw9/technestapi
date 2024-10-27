import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // Method to find a user by email
  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Method to create a new user
  async createUser(email: string, passwordHash: string): Promise<Users> {
    const user = this.usersRepository.create({ email, passwordHash });
    return this.usersRepository.save(user);
  }

  // Method to find a user by ID
  async findById(id: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
