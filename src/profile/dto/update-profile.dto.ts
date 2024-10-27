import { IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

// Define the enum in TypeScript to match the database exactly
export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  profile_picture_url?: string;

  @IsOptional()
  @IsEnum(UserGender, {
    message: 'Gender must be either male, female, or other'
  })
  gender?: UserGender;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;
}