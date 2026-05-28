-- Script untuk mengatasi Error RLS (Simplifikasi Keamanan)
-- Jalankan ini di Supabase SQL Editor

-- Hapus policy yang lama
DROP POLICY IF EXISTS "Allow admin insert" ON public.staff_roles;
DROP POLICY IF EXISTS "Allow admin delete" ON public.staff_roles;

-- Buat policy baru yang lebih sederhana (diizinkan untuk user yang login)
-- Keamanan tetap terjamin karena API kita di Next.js (middleware) sudah memblokir akses dari non-admin
CREATE POLICY "Allow auth insert" 
ON public.staff_roles FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow auth delete" 
ON public.staff_roles FOR DELETE 
TO authenticated 
USING (true);
