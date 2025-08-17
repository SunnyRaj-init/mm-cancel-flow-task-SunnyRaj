-- seed.sql
-- Database schema and seed data for subscription cancellation flow
-- Does not include production-level optimizations or advanced RLS policies

-- Enable Row Level Security

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  monthly_price INTEGER NOT NULL, -- Price in USD cents
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending_cancellation', 'cancelled')),
  next_due_date TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cancellations table
CREATE TABLE IF NOT EXISTS cancellations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  downsell_variant TEXT NOT NULL CHECK (downsell_variant IN ('A', 'B')),
  reason TEXT,
  accepted_downsell BOOLEAN DEFAULT FALSE,
  roles_applied TEXT CHECK(roles_applied IN ('0','1-5','6-20','20+')),
  companies_emailed TEXT CHECK(companies_emailed IN ('0','1-5','6-20','20+')),
  companies_interviewed TEXT CHECK(companies_interviewed IN ('0','1-2','3-5','5+')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to handle yes I found a job sequence from i.e. "Found a Job – Step 1" screen
CREATE TABLE IF NOT EXISTS cancellation_job_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  found_with_mm TEXT NOT NULL CHECK(found_with_mm IN ('Yes','No')),
  roles_applied TEXT NOT NULL CHECK(roles_applied IN ('0','1-5','6-20','20+')),
  companies_emailed TEXT NOT NULL CHECK(companies_emailed IN ('0','1-5','6-20','20+')),
  companies_interviewed TEXT NOT NULL CHECK(companies_interviewed IN ('0','1-2','3-5','5+')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  feedback TEXT DEFAULT NULL,
  help_with_lawyer TEXT DEFAULT NULL CHECK(help_with_lawyer IN ('Yes','No')),
  visa_type TEXT  DEFAULT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cancellations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cancellation_job_feedback ENABLE ROW LEVEL SECURITY;

-- Ensure one subscription per user
ALTER TABLE subscriptions
  ADD CONSTRAINT one_subscription_per_user UNIQUE (user_id);

-- Ensure one cancellation per user
ALTER TABLE cancellations
  ADD CONSTRAINT one_cancellation_per_user UNIQUE (user_id);

-- Ensure one feedback row per user
ALTER TABLE cancellation_job_feedback
  ADD CONSTRAINT one_feedback_per_user UNIQUE (user_id);

-- Enabling descrption of the main reason to be stored 
ALTER TABLE cancellations
  ADD COLUMN reason_description TEXT;

-- Basic RLS policies (candidates should enhance these)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cancellations" ON cancellations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own cancellations" ON cancellations
  FOR SELECT USING (auth.uid() = user_id);

-- Policies for authenticated users (optional, still useful for reads)
CREATE POLICY "Users can view their feedback"
  ON cancellation_job_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Allow server-side inserts using the service role key
CREATE POLICY "Service role can insert feedback"
  ON cancellation_job_feedback
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Allow server-side inserts using the service role key
CREATE POLICY "Service role can insert cancellations"
  ON cancellations
  FOR INSERT TO service_role
  WITH CHECK (true);
 
-- Seed data
INSERT INTO users (id, email) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'user1@example.com'),
  ('550e8400-e29b-41d4-a716-446655440002', 'user2@example.com'),
  ('550e8400-e29b-41d4-a716-446655440003', 'user3@example.com')
ON CONFLICT (email) DO NOTHING;

-- Seed subscriptions with $25 and $29 plans
INSERT INTO subscriptions (user_id, monthly_price, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 2500, 'active'), -- $25.00
  ('550e8400-e29b-41d4-a716-446655440002', 2900, 'active'), -- $29.00
  ('550e8400-e29b-41d4-a716-446655440003', 2500, 'active')  -- $25.00
ON CONFLICT DO NOTHING; 