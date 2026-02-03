-- =============================================
-- DocuSafe Database Schema
-- =============================================

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  storage_used_bytes BIGINT DEFAULT 0,
  storage_limit_bytes BIGINT DEFAULT 524288000, -- 500 MB default
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Spheres Table
-- =============================================
CREATE TABLE public.spheres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10) DEFAULT '🔵',
  color VARCHAR(7) DEFAULT '#3B82F6',
  position INT NOT NULL,
  is_system BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.spheres ENABLE ROW LEVEL SECURITY;

-- Spheres RLS policies
CREATE POLICY "Users can view their own spheres" ON public.spheres
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own spheres" ON public.spheres
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spheres" ON public.spheres
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spheres" ON public.spheres
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- Sphere File Templates Table
-- =============================================
CREATE TABLE public.sphere_file_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sphere_id UUID NOT NULL REFERENCES public.spheres(id) ON DELETE CASCADE,
  default_name VARCHAR(200) NOT NULL,
  description TEXT,
  help_text TEXT,
  is_mandatory BOOLEAN DEFAULT false,
  position INT NOT NULL
);

-- Enable RLS
ALTER TABLE public.sphere_file_templates ENABLE ROW LEVEL SECURITY;

-- Templates RLS policies (users access templates via sphere ownership)
CREATE POLICY "Users can view templates of their spheres" ON public.sphere_file_templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.spheres 
      WHERE spheres.id = sphere_file_templates.sphere_id 
      AND spheres.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create templates for their spheres" ON public.sphere_file_templates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.spheres 
      WHERE spheres.id = sphere_file_templates.sphere_id 
      AND spheres.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update templates of their spheres" ON public.sphere_file_templates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.spheres 
      WHERE spheres.id = sphere_file_templates.sphere_id 
      AND spheres.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete templates of their spheres" ON public.sphere_file_templates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.spheres 
      WHERE spheres.id = sphere_file_templates.sphere_id 
      AND spheres.user_id = auth.uid()
    )
  );

-- =============================================
-- User Sphere Files Table
-- =============================================
CREATE TABLE public.user_sphere_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sphere_id UUID NOT NULL REFERENCES public.spheres(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.sphere_file_templates(id) ON DELETE SET NULL,
  custom_name VARCHAR(200) NOT NULL,
  file_path TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_archived BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.user_sphere_files ENABLE ROW LEVEL SECURITY;

-- Files RLS policies
CREATE POLICY "Users can view their own files" ON public.user_sphere_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own files" ON public.user_sphere_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files" ON public.user_sphere_files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files" ON public.user_sphere_files
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- Passwords Table (encrypted)
-- =============================================
CREATE TABLE public.passwords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name VARCHAR(200) NOT NULL,
  service_icon VARCHAR(10),
  service_url TEXT,
  username VARCHAR(200),
  encrypted_password TEXT NOT NULL,
  encryption_iv TEXT NOT NULL,
  encrypted_notes TEXT,
  notes_iv TEXT,
  password_strength_score INT,
  category VARCHAR(50) CHECK (category IN ('personal', 'professional', 'banking', 'other')),
  last_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.passwords ENABLE ROW LEVEL SECURITY;

-- Passwords RLS policies
CREATE POLICY "Users can view their own passwords" ON public.passwords
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own passwords" ON public.passwords
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own passwords" ON public.passwords
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own passwords" ON public.passwords
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- User Encryption Keys Table
-- =============================================
CREATE TABLE public.user_encryption_keys (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  key_salt TEXT NOT NULL,
  verification_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_encryption_keys ENABLE ROW LEVEL SECURITY;

-- Encryption keys RLS policies
CREATE POLICY "Users can view their own encryption key" ON public.user_encryption_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own encryption key" ON public.user_encryption_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own encryption key" ON public.user_encryption_keys
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- Predefined Services Table (public)
-- =============================================
CREATE TABLE public.predefined_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  url TEXT,
  category VARCHAR(50)
);

-- Enable RLS but allow public read
ALTER TABLE public.predefined_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view predefined services" ON public.predefined_services
  FOR SELECT USING (true);

-- Insert predefined services
INSERT INTO public.predefined_services (name, icon, url, category) VALUES
  ('Netflix', '🎬', 'https://netflix.com', 'personal'),
  ('Gmail', '📧', 'https://mail.google.com', 'personal'),
  ('LinkedIn', '💼', 'https://linkedin.com', 'professional'),
  ('Amazon', '🛒', 'https://amazon.fr', 'personal'),
  ('Facebook', '📘', 'https://facebook.com', 'personal'),
  ('Instagram', '📷', 'https://instagram.com', 'personal'),
  ('Spotify', '🎵', 'https://spotify.com', 'personal'),
  ('PayPal', '💳', 'https://paypal.com', 'banking'),
  ('Google', '🔍', 'https://google.com', 'personal'),
  ('Twitter/X', '🐦', 'https://x.com', 'personal'),
  ('GitHub', '👨‍💻', 'https://github.com', 'professional'),
  ('Slack', '💬', 'https://slack.com', 'professional'),
  ('Dropbox', '📦', 'https://dropbox.com', 'personal'),
  ('Apple', '🍎', 'https://apple.com', 'personal'),
  ('Microsoft', '🪟', 'https://microsoft.com', 'professional');

-- =============================================
-- Function to create default spheres for new users
-- =============================================
CREATE OR REPLACE FUNCTION public.create_user_spheres()
RETURNS TRIGGER AS $$
DECLARE
  sphere_record RECORD;
  new_sphere_id UUID;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id) VALUES (NEW.id);

  -- Define sphere templates
  FOR sphere_record IN 
    SELECT * FROM (VALUES
      (1, 'IDENTITÉ & ÉTAT CIVIL', '🆔', '#3B82F6'),
      (2, 'FAMILLE', '👨‍👩‍👧', '#8B5CF6'),
      (3, 'LOGEMENT', '🏠', '#10B981'),
      (4, 'TRAVAIL', '💼', '#F59E0B'),
      (5, 'FINANCES', '💰', '#EF4444'),
      (6, 'SANTÉ', '🏥', '#EC4899'),
      (7, 'VÉHICULE', '🚗', '#6366F1'),
      (8, 'ÉTUDES & DIPLÔMES', '🎓', '#14B8A6'),
      (9, 'JURIDIQUE', '⚖️', '#64748B'),
      (10, 'MOTS DE PASSE', '🔑', '#7C3AED'),
      (11, 'DIVERS', '📁', '#94A3B8')
    ) AS t(pos, name, icon, color)
  LOOP
    -- Insert sphere
    INSERT INTO public.spheres (user_id, name, icon, color, position, is_system)
    VALUES (NEW.id, sphere_record.name, sphere_record.icon, sphere_record.color, sphere_record.pos, true)
    RETURNING id INTO new_sphere_id;
    
    -- Insert file templates based on sphere
    CASE sphere_record.pos
      WHEN 1 THEN -- IDENTITÉ
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Carte d''identité', 'Carte nationale d''identité', 'Recto-verso de votre CNI', true, 1),
          (new_sphere_id, 'Passeport', 'Passeport français', 'Page principale du passeport', false, 2),
          (new_sphere_id, 'Acte de naissance', 'Acte de naissance intégral', 'Copie intégrale récente', true, 3),
          (new_sphere_id, 'Permis de conduire', 'Permis de conduire', 'Recto-verso du permis', false, 4);
      WHEN 2 THEN -- FAMILLE
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Livret de famille', 'Livret de famille', 'Pages principales', true, 1),
          (new_sphere_id, 'Acte de mariage', 'Acte de mariage', 'Copie intégrale', false, 2),
          (new_sphere_id, 'Acte naissance enfant', 'Acte de naissance enfant', 'Pour chaque enfant', false, 3),
          (new_sphere_id, 'Certificat PACS', 'Certificat de PACS', 'Si applicable', false, 4),
          (new_sphere_id, 'Attestation CAF', 'Attestation CAF', 'Attestation récente', false, 5);
      WHEN 3 THEN -- LOGEMENT
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Bail de location', 'Contrat de bail', 'Bail signé', true, 1),
          (new_sphere_id, 'Quittance loyer', 'Quittance de loyer', 'Dernière quittance', false, 2),
          (new_sphere_id, 'Facture électricité', 'Facture EDF/Engie', 'Dernière facture', false, 3),
          (new_sphere_id, 'Assurance habitation', 'Attestation assurance', 'Attestation en cours', true, 4);
      WHEN 4 THEN -- TRAVAIL
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Contrat de travail', 'CDI/CDD', 'Contrat signé', true, 1),
          (new_sphere_id, 'Fiche de paie', 'Bulletin de salaire', 'Derniers bulletins', true, 2),
          (new_sphere_id, 'Attestation employeur', 'Attestation de l''employeur', 'Certificat de travail', false, 3);
      WHEN 5 THEN -- FINANCES
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'RIB', 'Relevé d''identité bancaire', 'RIB principal', true, 1),
          (new_sphere_id, 'Avis d''imposition', 'Dernier avis d''imposition', 'Année en cours', true, 2),
          (new_sphere_id, 'Relevé bancaire', 'Relevé de compte', 'Derniers relevés', false, 3);
      WHEN 6 THEN -- SANTÉ
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Carte vitale', 'Attestation carte vitale', 'Attestation récente', true, 1),
          (new_sphere_id, 'Carte mutuelle', 'Attestation mutuelle', 'Carte de tiers payant', false, 2),
          (new_sphere_id, 'Carnet vaccination', 'Carnet de vaccination', 'À jour', false, 3),
          (new_sphere_id, 'Ordonnances', 'Ordonnances médicales', 'Ordonnances importantes', false, 4);
      WHEN 7 THEN -- VÉHICULE
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Carte grise', 'Certificat d''immatriculation', 'Carte grise à jour', true, 1),
          (new_sphere_id, 'Assurance auto', 'Attestation assurance', 'Carte verte', true, 2),
          (new_sphere_id, 'Contrôle technique', 'PV contrôle technique', 'Dernier CT', false, 3);
      WHEN 8 THEN -- ÉTUDES
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Diplôme Bac', 'Baccalauréat', 'Copie du diplôme', false, 1),
          (new_sphere_id, 'Diplôme supérieur', 'Licence/Master/Doctorat', 'Diplômes obtenus', false, 2),
          (new_sphere_id, 'Certificats formation', 'Certifications professionnelles', 'Attestations de formation', false, 3);
      WHEN 9 THEN -- JURIDIQUE
        INSERT INTO public.sphere_file_templates (sphere_id, default_name, description, help_text, is_mandatory, position) VALUES
          (new_sphere_id, 'Testament', 'Testament', 'Document légal', false, 1),
          (new_sphere_id, 'Procuration', 'Procuration', 'Procurations en cours', false, 2);
      ELSE
        -- MOTS DE PASSE (10) and DIVERS (11) - no default templates
        NULL;
    END CASE;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_spheres();

-- =============================================
-- Function to update timestamps
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for user documents
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('user-documents', 'user-documents', false, 10485760);

-- Storage RLS policies
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );