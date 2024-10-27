import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { SupabaseService } from '../../supabase/supabase.service';
import { UpdateProfileDto, UserGender } from './dto/update-profile.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Import CloudinaryService
import * as Multer from 'multer'; // Import Multer

@Injectable()
export class ProfileService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getUserProfile(userId: string) {
    const { data, error } = await this.supabaseService.client
      .from('users')
      .select('id, email, full_name, phone_number, profile_picture_url, gender, date_of_birth')
      .eq('id', userId)
      .single();

    if (error) {
      throw new NotFoundException(`Profile not found for user ID: ${userId}`);
    }

    return data;
  }

  async updateUserProfile(userId: string, updateProfileDto: UpdateProfileDto, profilePicture: Multer.File) {
    let profilePictureUrl = null;

    // Upload to Cloudinary if a file is provided
    if (profilePicture) {
      const uploadResult: string = await this.cloudinaryService.uploadImage(profilePicture);
      profilePictureUrl = uploadResult; // Assuming the upload result is a URL string
    }

    if (updateProfileDto.gender) {
        updateProfileDto.gender = updateProfileDto.gender.toLowerCase() as UserGender;
    }

    // Update user profile in Supabase
    const { error } = await this.supabaseService.client
      .from('users')
      .update({
        full_name: updateProfileDto.full_name,
        phone_number: updateProfileDto.phone_number,
        profile_picture_url: profilePictureUrl,
        gender: updateProfileDto.gender,
        date_of_birth: updateProfileDto.date_of_birth
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }

    return { message: 'Profile updated successfully.' };
  }
}
