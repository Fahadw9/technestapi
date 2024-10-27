// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from 'supabase/supabase.module';

@Module({
  imports: [AuthModule, SupabaseModule],  // Import AuthModule to use JwtAuthGuard in UsersController
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
