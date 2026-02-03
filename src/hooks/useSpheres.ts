import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Sphere {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  position: number;
  is_system: boolean | null;
}

export interface SphereWithStats extends Sphere {
  totalTemplates: number;
  filledTemplates: number;
}

export function useSpheres() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['spheres', user?.id],
    queryFn: async (): Promise<SphereWithStats[]> => {
      if (!user) return [];

      // Get spheres
      const { data: spheres, error: spheresError } = await supabase
        .from('spheres')
        .select('*')
        .eq('user_id', user.id)
        .order('position');

      if (spheresError) throw spheresError;

      // Get templates count for each sphere
      const { data: templates, error: templatesError } = await supabase
        .from('sphere_file_templates')
        .select('sphere_id');

      if (templatesError) throw templatesError;

      // Get filled files for each sphere
      const { data: files, error: filesError } = await supabase
        .from('user_sphere_files')
        .select('sphere_id, template_id')
        .eq('user_id', user.id)
        .eq('is_archived', false);

      if (filesError) throw filesError;

      // Calculate stats for each sphere
      return spheres.map((sphere) => {
        const sphereTemplates = templates.filter(t => t.sphere_id === sphere.id);
        const filledTemplates = new Set(
          files
            .filter(f => f.sphere_id === sphere.id && f.template_id)
            .map(f => f.template_id)
        ).size;

        return {
          ...sphere,
          totalTemplates: sphereTemplates.length,
          filledTemplates,
        };
      });
    },
    enabled: !!user,
  });
}
