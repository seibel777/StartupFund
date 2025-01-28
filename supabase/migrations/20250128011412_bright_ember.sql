/*
  # Add function to increment project raised amount

  1. New Functions
    - `increment_project_raised`: Safely increments a project's raised amount
      - Parameters:
        - p_project_id: Project ID
        - p_amount: Amount to add
*/

CREATE OR REPLACE FUNCTION increment_project_raised(
  p_project_id uuid,
  p_amount numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET raised = raised + p_amount
  WHERE id = p_project_id;
END;
$$;