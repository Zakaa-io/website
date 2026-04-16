-- Create files table for storing file metadata
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster user file lookups
CREATE INDEX IF NOT EXISTS idx_files_user_id ON public.files(user_id);

-- Enable Row Level Security
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own files
CREATE POLICY "files_select_own" ON public.files 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "files_insert_own" ON public.files 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "files_update_own" ON public.files 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "files_delete_own" ON public.files 
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to files table
DROP TRIGGER IF EXISTS files_updated_at ON public.files;
CREATE TRIGGER files_updated_at
  BEFORE UPDATE ON public.files
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
