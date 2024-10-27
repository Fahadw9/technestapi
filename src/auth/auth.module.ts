// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseModule } from '../../supabase/supabase.module'; // Import the Supabase module here
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
      ,SupabaseModule], // Add SupabaseModule to imports
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
