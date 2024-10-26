-- 01_init.sql

-- Create users table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,      -- We’ll store hashed passwords here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create listings table
CREATE TABLE listings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key to users
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image_url TEXT,                       -- URL to the image on Cloudinary
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id uuid REFERENCES users(id) ON DELETE CASCADE,    -- Foreign key to users (sender)
    receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key to users (receiver)
    listing_id uuid REFERENCES listings(id) ON DELETE CASCADE, -- Foreign key to listings
    content TEXT NOT NULL,                 -- Message content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create indexes for faster querying

-- Index on listings user_id for faster lookup of user’s listings
CREATE INDEX idx_listings_user_id ON listings(user_id);

-- Index on messages sender_id for faster lookup of sent messages
CREATE INDEX idx_messages_sender_id ON messages(sender_id);

-- Index on messages receiver_id for faster lookup of received messages
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

-- Index on messages listing_id for faster lookup of messages related to a listing
CREATE INDEX idx_messages_listing_id ON messages(listing_id);
