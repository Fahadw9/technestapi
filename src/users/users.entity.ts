// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'full_name', nullable: true }) // Full name, optional
  fullName: string;

  @Column({ name: 'phone_number', nullable: true, unique: true }) // Phone number, optional and unique
  phoneNumber: string;

  @Column({ name: 'profile_picture_url', nullable: true }) // Profile picture URL, optional
  profilePictureUrl: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true }) // Gender enum, optional
  gender: 'male' | 'female' | 'other';

  @Column({ type: 'date', name: 'date_of_birth', nullable: true }) // Date of birth, optional
  dateOfBirth: Date;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
