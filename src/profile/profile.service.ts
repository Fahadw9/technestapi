import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class ProfileService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUserProfile(userId: string) {
    console.log('Fetching profile for user ID:', userId);

    const { data, error } = await this.supabaseService.client
      .from('users')
      .select('id, email, full_name, phone_number, profile_picture_url, gender, date_of_birth')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(`Error retrieving profile for user ID ${userId}:`, error);
      return null; // Handle error as needed
    }

    console.log('Retrieved profile data:', data);
    return data;
  }
}
