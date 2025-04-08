
-- Create code_redemptions table to track redeemed codes
CREATE TABLE public.code_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  code_id UUID REFERENCES public.redeem_codes(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, code_id)
);

-- Add necessary columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS games_played INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS games_won INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rank TEXT DEFAULT 'Bronze',
  ADD COLUMN IF NOT EXISTS vip BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS vip_type TEXT;

-- Add RLS policies for code_redemptions table
ALTER TABLE public.code_redemptions ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own code redemptions
CREATE POLICY "Users can insert their own redemptions" 
ON public.code_redemptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own redemptions
CREATE POLICY "Users can view their own redemptions"
ON public.code_redemptions
FOR SELECT
USING (auth.uid() = user_id);
