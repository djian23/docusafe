import { useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { FileTemplateCard } from '@/components/dashboard/FileTemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Upload, Plus, Edit, Check, X } from 'lucide-react';
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
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const customFileInputRef = useRef<HTMLInputElement>(null);

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024;

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

  // Rename sphere mutation
  const renameMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!id) throw new Error('No sphere id');
      const { error } = await supabase
        .from('spheres')
        .update({ name })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sphere', id] });
      queryClient.invalidateQueries({ queryKey: ['spheres'] });
      setIsRenaming(false);
      toast({ title: 'Sphère renommée ✅' });
    },
    onError: () => {
      toast({ title: 'Erreur', variant: 'destructive' });
    },
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, templateId }: { file: File; templateId: string | null }) => {
      if (!user || !sphere) throw new Error('Not authenticated');
      const filePath = `${user.id}/${sphere.name}/${Date.now()}-${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file);
      if (uploadError) throw uploadError;

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

      await supabase
        .from('profiles')
        .update({ storage_used_bytes: storageUsed + file.size })
        .eq('user_id', user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sphere-files', id] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['spheres'] });
      toast({ title: 'Fichier uploadé ✅' });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({ title: 'Erreur', description: 'Impossible d\'uploader le fichier.', variant: 'destructive' });
    },
    onSettled: () => {
      setUploadingTemplateId(null);
    },
  });

  const handleFileUpload = useCallback((templateId: string | null, file: File) => {
    setUploadingTemplateId(templateId);
    uploadMutation.mutate({ file, templateId });
  }, [uploadMutation]);

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(null, file);
    }
  };

  const getFileForTemplate = (templateId: string) => {
    return userFiles?.find(f => f.template_id === templateId);
  };

  const customFiles = userFiles?.filter(f => !f.template_id) || [];
  const isLoading = sphereLoading || templatesLoading || filesLoading;

  const startRename = () => {
    setNewName(sphere?.name || '');
    setIsRenaming(true);
  };

  const confirmRename = () => {
    if (newName.trim()) renameMutation.mutate(newName.trim());
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
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
        <MobileBottomNav />
      </div>
    );
  }

  if (!sphere) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
        <main className="flex-1 p-4 md:p-8 flex items-center justify-center pb-24 md:pb-8">
          <div className="text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">Sphère non trouvée</p>
            <Link to="/dashboard">
              <Button variant="link">Retour au tableau de bord</Button>
            </Link>
          </div>
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />
      
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 md:mb-6">
          <Link to="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden md:inline">Tableau de bord</span>
            <span className="md:hidden">Retour</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div 
            className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0"
            style={{ backgroundColor: `${sphere.color || '#3B82F6'}20` }}
          >
            {sphere.icon || '📁'}
          </div>
          <div className="flex-1 min-w-0">
            {isRenaming ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="h-9 text-lg font-bold"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setIsRenaming(false); }}
                />
                <Button size="icon" variant="ghost" onClick={confirmRename} className="shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsRenaming(false)} className="shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{sphere.name}</h1>
                <Button size="icon" variant="ghost" onClick={startRename} className="shrink-0 h-8 w-8">
                  <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {templates?.length || 0} documents requis
            </p>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-4 mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold">Documents</h2>
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
            <p className="text-muted-foreground text-sm">Aucun document requis pour cette sphère.</p>
          )}
        </div>

        {/* Custom Files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-semibold">Documents personnalisés</h2>
            <input
              ref={customFileInputRef}
              type="file"
              className="hidden"
              onChange={handleCustomFileUpload}
            />
            <Button variant="outline" size="sm" onClick={() => customFileInputRef.current?.click()}>
              <Plus className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Ajouter un fichier</span>
              <span className="md:hidden">Ajouter</span>
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
              <p className="text-sm">Aucun document personnalisé</p>
              <p className="text-xs">Ajoutez des fichiers supplémentaires ici</p>
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
