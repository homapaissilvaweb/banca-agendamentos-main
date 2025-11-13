-- Drop the public SELECT policy on bookings table
-- The bookings are only accessed via email notifications, not through the UI
-- This prevents public access to customer PII while maintaining booking functionality
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;