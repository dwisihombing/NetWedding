-- SQL Script to create staff_roles table and RLS policies for NetWedding Application

-- 1. Create the staff_roles table
CREATE TABLE IF NOT EXISTS public.staff_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'parhobas',
    status TEXT NOT NULL DEFAULT 'Aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.staff_roles ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to ensure a clean slate
DROP POLICY IF EXISTS "Allow public read access to staff_roles" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow anon read" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow admin insert" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow admin delete" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow auth insert" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow auth delete" ON public.staff_roles;

-- 4. Create Read Policies
-- Middleware uses the anon key to check if the user exists in the database
-- BEFORE they are fully authorized in the app.
CREATE POLICY "Allow anon read" 
ON public.staff_roles FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated read" 
ON public.staff_roles FOR SELECT 
TO authenticated 
USING (true);

-- 5. Create Insert/Delete Policies
-- Keamanan tetap terjamin karena API kita di Next.js (middleware) sudah memblokir akses dari non-admin
CREATE POLICY "Allow auth insert" 
ON public.staff_roles FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow auth delete" 
ON public.staff_roles FOR DELETE 
TO authenticated 
USING (true);

-- 6. Create the orders table for invitation orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    bride_name TEXT NOT NULL,
    religion TEXT NOT NULL,
    song_cover TEXT NOT NULL,
    song_main TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TEXT NOT NULL,
    event_location TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read orders" 
ON public.orders FOR SELECT 
TO authenticated 
USING (true);
