import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // For hashing passwords
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) { }

  async register(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { message: error.message, email };
    }

    const user = data.user; // This will contain the UUID from Supabase

    // Create a new user in the local database
    const passwordHash = await bcrypt.hash(password, 10);
    const dbUser = this.usersRepository.create({
      id: user.id, // Use the UUID from Supabase
      email,
      passwordHash,
    });

    try {
      await this.usersRepository.save(dbUser);
      return { message: 'User registered', email };
    } catch (dbError) {
      // Handle specific errors, such as duplicate ID error
      if (dbError.code === '23505') { // PostgreSQL error code for unique violation
        return { message: 'A user with this ID already exists.', email };
      }
      // Handle other unexpected errors
      return { message: dbError, email };
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
    });

    // Check for authentication errors
    if (error) {
        return { message: error.message }; // Return the error message as a response
    }

    const user = data.user;

    // Check if user exists
    if (!user) {
        return { message: 'User not found.' }; // Return a message if user does not exist
    }

    // Create a payload for the JWT token
    const payload = { email: user.email, sub: user.id };

    // Sign and return the JWT token
    const accessToken = this.jwtService.sign(payload);

    return { message: 'User logged in', accessToken }; // Return the token instead of just email
}

  async logout() {
    const { error } = await this.supabaseService.client.auth.signOut();

    if (error) {
      return { message: error.message };
    }

    return true;
  }
}
