import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes config available across all modules
    }),
    AuthModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}
