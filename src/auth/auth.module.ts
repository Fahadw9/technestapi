// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseModule } from '../../supabase/supabase.module'; // Import the Supabase module here
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Users]),
    SupabaseModule
  ], // Add SupabaseModule to imports
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, ConfigService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule { }
