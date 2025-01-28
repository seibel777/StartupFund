/*
  # Create projects table and policies

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `goal` (numeric)
      - `raised` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `end_date` (timestamptz)
      - `user_id` (uuid, references profiles)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for:
      - Anyone can read projects
      - Authenticated users can create projects
      - Users can update their own projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  goal numeric NOT NULL CHECK (goal > 0),
  raised numeric NOT NULL DEFAULT 0 CHECK (raised >= 0),
  image_url text NOT NULL,
  category text NOT NULL,
  end_date timestamptz NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Everyone can view projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can create projects
CREATE POLICY "Authenticated users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update their own projects
CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();