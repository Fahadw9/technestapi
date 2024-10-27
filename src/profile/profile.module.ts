import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller'; // Adjust the import path as necessary
import { ProfileService } from './profile.service'; // Adjust the import path as necessary

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService], // Export the service if it needs to be used in other modules
})
export class ProfileModule {}
