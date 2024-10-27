import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes config available across all modules
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users],
      synchronize: true, // Note: Set to false in production
    }),
    AuthModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}
