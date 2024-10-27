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
    // Fetch the current profile to retain the existing values
    const currentUserProfile = await this.getUserProfile(userId);

    // Prepare the update object
    const updateData: { [key: string]: any } = {};

    // Only include fields that are present in updateProfileDto and not null or undefined
    if (updateProfileDto.full_name !== undefined) {
        updateData.full_name = updateProfileDto.full_name;
    }
    if (updateProfileDto.phone_number !== undefined) {
        updateData.phone_number = updateProfileDto.phone_number;
    }
    if (updateProfileDto.gender !== undefined) {
        updateData.gender = updateProfileDto.gender.toLowerCase() as UserGender;
    }
    if (updateProfileDto.date_of_birth !== undefined) {
        updateData.date_of_birth = updateProfileDto.date_of_birth;
    }

    // If a profile picture is provided, upload it to Cloudinary and update the URL
    if (profilePicture) {
        const profilePictureUrl = await this.cloudinaryService.uploadImage(profilePicture);
        updateData.profile_picture_url = profilePictureUrl; // Set the new profile picture URL
    } else {
        // If no profile picture is provided, keep the current profile picture URL
        updateData.profile_picture_url = currentUserProfile.profile_picture_url;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
        return { message: 'No fields to update.' };
    }

    // Update user profile in Supabase
    const { error } = await this.supabaseService.client
        .from('users')
        .update(updateData)
        .eq('id', userId);

    if (error) {
        throw new Error(`Error updating profile: ${error.message}`);
    }

    return { message: 'Profile updated successfully.' };
}

}
