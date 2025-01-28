/*
  # Add Stripe integration tables

  1. New Tables
    - `stripe_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `account_id` (text) - Stripe account ID
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `donations`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `user_id` (uuid, references profiles)
      - `amount` (numeric)
      - `status` (text)
      - `stripe_payment_intent_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for secure access
*/

-- Stripe accounts table
CREATE TABLE IF NOT EXISTS stripe_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  account_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE stripe_accounts ENABLE ROW LEVEL SECURITY;

-- Users can read their own Stripe account
CREATE POLICY "Users can read own stripe account"
  ON stripe_accounts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Anyone can create donations
CREATE POLICY "Anyone can create donations"
  ON donations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can view their own donations
CREATE POLICY "Users can view own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Project owners can view their project's donations
CREATE POLICY "Project owners can view project donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = donations.project_id
      AND projects.user_id = auth.uid()
    )
  );