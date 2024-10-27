// src/profile/profile.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('myprofile')
  async getMyProfile(@Request() req) {
    console.log('User from JWT:', req.user); // Verify that req.user contains the expected values
    const userId = req.user?.id?.trim();
    return this.profileService.getUserProfile(userId);
  }
}
