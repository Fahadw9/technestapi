import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to protect this route
  @Get('email')
  getProfile(@Request() req) {
    // The user's email can be retrieved from the request object
    return { email: req.user.email };
  }
}
