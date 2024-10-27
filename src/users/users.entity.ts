// users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') // The name of the table
export class Users {
  @PrimaryGeneratedColumn('uuid') // Use 'uuid' for the primary key
  id: string;

  @Column({ unique: true }) // Ensure email is unique
  email: string;

  @Column({ name: 'password_hash' }) // Match the column name in the database
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' }) // Automatically set the creation date
  createdAt: Date;
}
