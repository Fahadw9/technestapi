-- 02_enable_rls_all_tables.sql

-- Enable RLS on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- Policy to allow users to view and update only their own records
CREATE POLICY "Allow individual user access" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow individual user updates" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Enable RLS on the listings table
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
-- Policy to allow users to view all listings but manage only their own
CREATE POLICY "Allow all users to view listings" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Allow individual user to manage their listings" ON public.listings FOR ALL USING (auth.uid() = user_id);

-- Enable RLS on the messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
-- Policy to allow users to view messages where they are the sender or receiver
CREATE POLICY "Allow user to view their messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
-- Policy to allow users to send messages
CREATE POLICY "Allow user to send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
-- Policy to restrict updates to message content by the sender only
CREATE POLICY "Allow user to edit their sent messages" ON public.messages FOR UPDATE USING (auth.uid() = sender_id);

-- Force RLS to ensure it applies to all queries on each table
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.listings FORCE ROW LEVEL SECURITY;
ALTER TABLE public.messages FORCE ROW LEVEL SECURITY;
