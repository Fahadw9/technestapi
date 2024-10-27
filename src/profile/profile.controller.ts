// src/profile/profile.controller.ts

import { Controller, Get, UseGuards, Request, Put, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as Multer from 'multer';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('myprofile')
  async getMyProfile(@Request() req) {
    const userId = req.user?.id?.trim();
    return this.profileService.getUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UseInterceptors(FileInterceptor('profile_picture')) // 'profile_picture' is the field name for the file upload
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() profilePicture: Multer.File
  ) {
    const userId = req.user?.id?.trim();
    return this.profileService.updateUserProfile(userId, updateProfileDto, profilePicture);
  }
}
