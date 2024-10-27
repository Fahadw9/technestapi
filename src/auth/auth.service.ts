import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });
    const user = data.user;
    
    if (error) {
      throw new Error(error.message);
    }

    return user;
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

    return user;
  }

  async logout() {
    const { error } = await this.supabaseService.client.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}
