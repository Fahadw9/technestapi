import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // For hashing passwords

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async register(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }

    const user = data.user; // This will contain the UUID from Supabase

    // Create a new user in the local database
    const passwordHash = await bcrypt.hash(password, 10);
    const dbUser = this.usersRepository.create({
      id: user.id, // Use the UUID from Supabase
      email,
      passwordHash,
    });

    await this.usersRepository.save(dbUser);
    return { message: 'User registered', email };
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    });
    const user = data.user;

    if (error) {
      throw new Error(error.message);
    }

    const dbuser = await this.usersRepository.findOne({ where: { email } });
    if (!dbuser || !(await bcrypt.compare(password, dbuser.passwordHash))) {
      throw new Error('Invalid credentials');
    }
    return { message: 'User logged in', email };  }

  async logout() {
    const { error } = await this.supabaseService.client.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}
