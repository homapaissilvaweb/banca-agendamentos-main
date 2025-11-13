-- Create a secure RPC function to check booking availability without exposing customer data
CREATE OR REPLACE FUNCTION public.check_availability(
  p_date date,
  p_time text
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM bookings
    WHERE date = p_date AND time = p_time
  );
$$;