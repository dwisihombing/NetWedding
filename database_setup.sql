-- SQL Script to create staff_roles table for NetWedding Application

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

-- 3. Create a policy that allows anyone to read (for the API / middleware to check)
-- In a real production app, we would restrict this further, but since we rely on edge middleware 
-- using the ANON key to check roles before authenticating fully, we allow reading for now.
CREATE POLICY "Allow public read access to staff_roles"
ON public.staff_roles FOR SELECT
USING (true);

-- 4. Create policies for insert/update/delete 
-- We only want the SERVICE_ROLE (backend API) to be able to insert/delete
-- so we don't grant INSERT/DELETE to the ANON or authenticated roles directly
-- (The API routes will use the service role or handle it securely)
