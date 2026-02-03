import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { FileTemplateCard } from '@/components/dashboard/FileTemplateCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileTemplate {
  id: string;
  default_name: string;
  description: string | null;
  help_text: string | null;
  is_mandatory: boolean | null;
  position: number;
}

interface UserFile {
  id: string;
  custom_name: string;
  file_path: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  template_id: string | null;
  uploaded_at: string | null;
}

interface Sphere {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export default function SphereDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadingTemplateId, setUploadingTemplateId] = useState<string | null>(null);

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024;

  // Fetch sphere details
  const { data: sphere, isLoading: sphereLoading } = useQuery({
    queryKey: ['sphere', id],
    queryFn: async (): Promise<Sphere | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('spheres')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch templates for this sphere
  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ['sphere-templates', id],
    queryFn: async (): Promise<FileTemplate[]> => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('sphere_file_templates')
        .select('*')
        .eq('sphere_id', id)
        .order('position');
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch user's files for this sphere
  const { data: userFiles, isLoading: filesLoading } = useQuery({
    queryKey: ['user-sphere-files', id, user?.id],
    queryFn: async (): Promise<UserFile[]> => {
      if (!id || !user) return [];
      const { data, error } = await supabase
        .from('user_sphere_files')
        .select('*')
        .eq('sphere_id', id)
        .eq('user_id', user.id)
        .eq('is_archived', false);
      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, templateId }: { file: File; templateId: string | null }) => {
      if (!user || !sphere) throw new Error('Not authenticated');

      const filePath = `${user.id}/${sphere.name}/${Date.now()}-${file.name}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create file record
      const { error: insertError } = await supabase
        .from('user_sphere_files')
        .insert({
          user_id: user.id,
          sphere_id: sphere.id,
          template_id: templateId,
          custom_name: file.name,
          file_path: filePath,
          file_size_bytes: file.size,
          mime_type: file.type,
        });

      if (insertError) throw insertError;

      // Update storage used
      await supabase
        .from('profiles')
        .update({ storage_used_bytes: storageUsed + file.size })
        .eq('user_id', user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sphere-files', id] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['spheres'] });
      toast({
        title: 'Fichier uploadé',
        description: 'Votre document a été ajouté avec succès.',
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'uploader le fichier.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setUploadingTemplateId(null);
    },
  });

  const handleFileUpload = useCallback((templateId: string | null, file: File) => {
    setUploadingTemplateId(templateId);
    uploadMutation.mutate({ file, templateId });
  }, [uploadMutation]);

  const getFileForTemplate = (templateId: string) => {
    return userFiles?.find(f => f.template_id === templateId);
  };

  const customFiles = userFiles?.filter(f => !f.template_id) || [];

  const isLoading = sphereLoading || templatesLoading || filesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
        <main className="flex-1 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-4 bg-muted rounded w-48" />
            <div className="grid gap-4 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!sphere) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">Sphère non trouvée</p>
            <Link to="/dashboard">
              <Button variant="link">Retour au tableau de bord</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
      
      <main className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">
            Tableau de bord
          </Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="text-foreground">{sphere.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${sphere.color || '#3B82F6'}20` }}
          >
            {sphere.icon || '📁'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{sphere.name}</h1>
            <p className="text-muted-foreground">
              {templates?.length || 0} documents requis
            </p>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Documents</h2>
          {templates && templates.length > 0 ? (
            <div className="space-y-3">
              {templates.map((template) => (
                <FileTemplateCard
                  key={template.id}
                  template={template}
                  file={getFileForTemplate(template.id)}
                  onUpload={(file) => handleFileUpload(template.id, file)}
                  isUploading={uploadingTemplateId === template.id}
                  sphereId={sphere.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun document requis pour cette sphère.</p>
          )}
        </div>

        {/* Custom Files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Documents personnalisés</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un fichier
            </Button>
          </div>
          
          {customFiles.length > 0 ? (
            <div className="space-y-3">
              {customFiles.map((file) => (
                <FileTemplateCard
                  key={file.id}
                  template={null}
                  file={file}
                  onUpload={() => {}}
                  isUploading={false}
                  sphereId={sphere.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed rounded-xl text-muted-foreground">
              <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Aucun document personnalisé</p>
              <p className="text-sm">Ajoutez des fichiers supplémentaires ici</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
