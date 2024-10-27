// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { User } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Fetch user profile by user ID
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabaseService.client
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user profile: ${error.message}`);
    }
    return data;
  }

  // Update user profile information
  async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await this.supabaseService.client
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }
    return data;
  }
}
