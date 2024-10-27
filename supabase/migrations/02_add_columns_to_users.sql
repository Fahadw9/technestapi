-- First, create an ENUM type for gender
CREATE TYPE user_gender AS ENUM ('male', 'female', 'other');

-- Then modify the users table
ALTER TABLE users 
ADD COLUMN full_name TEXT,
ADD COLUMN phone_number TEXT UNIQUE,
ADD COLUMN profile_picture_url TEXT,
ADD COLUMN gender user_gender,  -- Use the ENUM type instead of TEXT with CHECK
ADD COLUMN date_of_birth DATE;