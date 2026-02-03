import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Download, Trash2, Eye, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FileTemplate {
  id: string;
  default_name: string;
  description: string | null;
  help_text: string | null;
  is_mandatory: boolean | null;
}

interface UserFile {
  id: string;
  custom_name: string;
  file_path: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  uploaded_at: string | null;
}

interface FileTemplateCardProps {
  template: FileTemplate | null;
  file: UserFile | undefined;
  onUpload: (file: File) => void;
  isUploading: boolean;
  sphereId: string;
}

export function FileTemplateCard({ 
  template, 
  file, 
  onUpload, 
  isUploading,
  sphereId 
}: FileTemplateCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDownloading, setIsDownloading] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const { error } = await supabase
        .from('user_sphere_files')
        .update({ is_archived: true })
        .eq('id', fileId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sphere-files', sphereId] });
      queryClient.invalidateQueries({ queryKey: ['spheres'] });
      toast({
        title: 'Fichier archivé',
        description: 'Le fichier a été archivé avec succès.',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'archiver le fichier.',
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleDownload = async () => {
    if (!file) return;
    
    setIsDownloading(true);
    try {
      const { data, error } = await supabase.storage
        .from('user-documents')
        .createSignedUrl(file.file_path, 300); // 5 minutes

      if (error) throw error;
      
      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger le fichier.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return '0 Ko';
    const kb = bytes / 1024;
    if (kb < 1000) return `${kb.toFixed(0)} Ko`;
    return `${(kb / 1024).toFixed(1)} Mo`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Empty slot
  if (!file) {
    return (
      <Card className="border-dashed hover:border-primary/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">
                {template?.default_name || 'Document'}
                {template?.is_mandatory && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </h3>
              {template?.help_text && (
                <p className="text-sm text-muted-foreground">{template.help_text}</p>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Upload...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Ajouter
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filled slot
  return (
    <Card className="hover:shadow-soft transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {file.custom_name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatBytes(file.file_size_bytes)} • {formatDate(file.uploaded_at)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              disabled={isDownloading}
              title="Télécharger"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              disabled={isDownloading}
              title="Voir"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteMutation.mutate(file.id)}
              disabled={deleteMutation.isPending}
              title="Archiver"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
