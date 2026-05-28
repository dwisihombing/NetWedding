-- SQL Script to update staff_roles RLS policies
-- Run this in your Supabase SQL Editor to fix the RLS violation error!

-- Drop the previous select policy if you want a clean slate (optional, but good practice)
DROP POLICY IF EXISTS "Allow public read access to staff_roles" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow admin insert" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow admin delete" ON public.staff_roles;

-- 1. Read Policy: Anyone who is authenticated can read the staff list 
-- (Our edge middleware relies on this to verify roles during login)
CREATE POLICY "Allow authenticated read" 
ON public.staff_roles FOR SELECT 
TO authenticated 
USING (true);

-- We also need to allow anon to read because our middleware uses the anon key
-- to check if the user exists in the database BEFORE they are fully authorized in the app.
CREATE POLICY "Allow anon read" 
ON public.staff_roles FOR SELECT 
USING (true);

-- 2. Insert Policy: Only allow if the user is the Master Admin OR a registered Admin
CREATE POLICY "Allow admin insert" 
ON public.staff_roles FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.jwt() ->> 'email' = 'caturtoh@gmail.com' 
  OR 
  EXISTS (
    SELECT 1 FROM public.staff_roles sr
    WHERE sr.email = auth.jwt() ->> 'email' AND sr.role = 'admin' AND sr.status = 'Aktif'
  )
);

-- 3. Delete Policy: Only allow if the user is the Master Admin OR a registered Admin
CREATE POLICY "Allow admin delete" 
ON public.staff_roles FOR DELETE 
TO authenticated 
USING (
  auth.jwt() ->> 'email' = 'caturtoh@gmail.com' 
  OR 
  EXISTS (
    SELECT 1 FROM public.staff_roles sr
    WHERE sr.email = auth.jwt() ->> 'email' AND sr.role = 'admin' AND sr.status = 'Aktif'
  )
);
