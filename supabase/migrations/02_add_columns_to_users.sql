-- 03_add_columns_to_users.sql

-- Add new columns to the users table
ALTER TABLE users 
ADD COLUMN full_name TEXT,
ADD COLUMN phone_number TEXT UNIQUE,         -- Ensuring phone number is unique
ADD COLUMN profile_picture_url TEXT,         -- URL to the profile picture stored on Cloudinary
ADD COLUMN gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),  -- Enforcing gender options
ADD COLUMN date_of_birth DATE;
